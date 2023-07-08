import type { HelloassoLog, Membership, User } from '@bde-cesi-nancy/types';
import type { Knex } from 'knex';

export async function up(knex: Knex) {

    // Repair memberships

    const membershipsWithoutUsers = await knex<Membership>('memberships')
        .where({ membership_user: null })
        .select('*');

    let updatedMemberships = 0;

    for (const membership of membershipsWithoutUsers) {
        const user = await knex<User>('directus_users')
            .where({ email: membership.adherent_email.toLowerCase() })
            .orWhere({ email: membership.payer_email.toLowerCase() });

        if (user.length !== 1) {
            console.warn(`Membership ${membership.id} has no user (${membership.adherent_email})`);
            continue;
        }

        await knex<Membership>('memberships')
            .where({ id: membership.id })
            .update({ membership_user: user[0]!.id });
        updatedMemberships++;
    }

    console.log(`Updated ${updatedMemberships} / ${membershipsWithoutUsers.length} memberships`);

    // Repair logs

    const logs = await knex<HelloassoLog>('helloasso_logs')
        .select('*');

    let updatedLogs = 0;

    for (const log of logs) {
        const event_type = JSON.parse(log.input).eventType as typeof log.event_type;

        if (log.reject_reason?.startsWith('Duplicate membership')) {
            const order_id = parseInt(/\(\d+\)/.exec(log.reject_reason)?.[0]?.replace(/[()]/g, '') as string);
            if (!isNaN(order_id)) {
                const membership = await knex<Membership>('memberships')
                    .where({ order_id })
                    .first();

                if (membership) {
                    await knex<HelloassoLog>('helloasso_logs')
                        .where({ id: log.id })
                        .update({
                            result_membership: membership.id,
                            success: true,
                            reject_reason: null,
                            event_type,
                        });
                    console.log(`Fixed log ${log.id} (${log.reject_reason} for ${membership.adherent_email})`);
                    updatedLogs++;

                    continue;
                } else {
                    console.warn(`No membership found for order ${order_id}`);
                    updatedLogs--;
                }
            } else {
                console.warn(`Could not parse order ID from reject reason: ${log.reject_reason} (log ${log.id})`);
                updatedLogs--;
            }
        }

        await knex<HelloassoLog>('helloasso_logs')
            .where({ id: log.id })
            .update({ event_type });
        updatedLogs++;
    }

    console.log(`Updated ${updatedLogs} / ${logs.length} logs`);
}

export async function down() {
    console.error('The migration 20220925A-repair-memberships-and-logs cannot be reverted');
}
