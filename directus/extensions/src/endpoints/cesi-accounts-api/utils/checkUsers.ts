import type { User } from '@bde-cesi-nancy/types';
import type { Knex } from 'knex';
import type { IAccount } from './parseCSV';

export async function checkUsers(accounts: IAccount[], knex: Knex) {
    const dbUsers = await knex<User[]>('directus_users')
        .select('id', 'email', 'promotion');

    let updatedUsersCount = 0;

    for (let dbUser of dbUsers) {
        const csvUser = accounts.find(a => a.email === dbUser.email);

        if (!csvUser || csvUser.promCode === dbUser.promotion)
            continue;

        await knex<User>('directus_users')
            .where('id', dbUser.id)
            .update({ promotion: csvUser.promCode });

        updatedUsersCount++;
    }

    return { updatedUsersCount };
}
