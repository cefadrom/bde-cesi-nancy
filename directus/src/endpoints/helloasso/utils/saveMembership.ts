import type { Membership } from '@bde-cesi-nancy/types';
import { User } from '@bde-cesi-nancy/types';
import type { Knex } from 'knex';
import { v4 as uuid } from 'uuid';
import type { OrdersItemDetail, OrdersPaymentDetail } from './helloAssoDefinitions';


export async function saveMembership(database: Knex, membership: OrdersItemDetail, payment?: OrdersPaymentDetail): Promise<SaveMembershipResult> {

    const order_id = membership!.order!.id!;
    const membership_id = membership!.id!;

    // Check if a membership with the same order_id already exists
    const existingMemberships = await database<Membership>('memberships')
        .where({ order_id })
        .orWhere({ membership_id })
        .select('*');

    // There can only be no membership or one membership with the same order_id
    if (existingMemberships.length > 1)
        return { success: false, error: `2 or more memberships found for order ${order_id}` };

    const existingMembership = existingMemberships[0];

    // Gather the data for the new membership
    const adherentMail = membership
        .customFields
        ?.find(f => f.name?.toLowerCase()?.includes('mail'))
        ?.answer
        ?.toLowerCase();
    const payerMail = membership.payer!.email!.toLowerCase();

    const membershipUsers: User[] = await database<User>('directus_users')
        .where({ email: payerMail })
        .orWhere({ email: adherentMail })
        .orWhere({ id: existingMembership?.id || 'x-no-user' })
        .select('*');

    // There can only be no user or one user with the supplied emails
    if (membershipUsers.length > 1)
        return { success: false, error: `2 or more users found for order ${order_id}` };

    const membershipUser = membershipUsers[0];

    // If the membership already exists, return it
    if (existingMembership)
        return { success: true, dbMembership: existingMembership, membershipUser };

    // If no membership with the same order_id exists, create a new one and return it
    const newMembership: Omit<Membership, 'origin_log'> = {
        id: uuid(),
        order_id,
        membership_id,
        order_date: new Date(membership.order!.date!),
        order_form: membership.order!.formSlug as 'adhesion-bde' | 'cotisation-bde',
        order_amount: (payment?.amount || membership.amount!) / 100,
        order_initial_amount: membership.initialAmount! / 100,
        adherent_name: `${membership.user!.firstName} ${membership.user!.lastName}`,
        adherent_email: adherentMail!,
        payer_name: `${membership.payer!.firstName} ${membership.payer!.lastName}`,
        payer_email: payerMail,
        membership_user: membershipUser?.id || null,
    };

    await database<Membership>('memberships').insert(newMembership);

    return { success: true, dbMembership: { ...newMembership, origin_log: [] }, membershipUser };
}


interface SaveMembershipResult {
    success: boolean;
    error?: string;
    dbMembership?: Membership;
    membershipUser?: User;
}
