import type { CesiAccount } from '@bde-cesi-nancy/types';
import type { Knex } from 'knex';
import type { IAccount } from './parseCSV';

export async function checkAccounts(accounts: IAccount[], knex: Knex) {
    const databaseAccounts = await knex<CesiAccount>('cesi_accounts')
        .select('id', 'name', 'email', 'promotion');

    const missingAccounts = accounts.filter(
        account => !databaseAccounts.find(dbAccount => dbAccount.email === account.email),
    );
    if (missingAccounts.length > 0)
        await knex<CesiAccount>('cesi_accounts').insert(missingAccounts.map(acc => ({
            id: acc.id,
            name: `${acc.lastName} ${acc.firstName}`,
            email: acc.email,
            promotion: acc.promCode,
        })));

    let updatedAccountsCount = 0;

    for (let dbAccount of databaseAccounts) {
        const account = accounts.find(acc => acc.email === dbAccount.email);
        if (!account)
            continue;

        const composedName = `${account.lastName} ${account.firstName}`;
        if (account.promCode === dbAccount.promotion && composedName === dbAccount.name)
            continue;

        await knex<CesiAccount>('cesi_accounts')
            .update({
                id: dbAccount.id,
                name: composedName,
                email: account.email,
                promotion: account.promCode,
            })
            .where({ id: dbAccount.id });

        updatedAccountsCount++;
    }

    const deletedAccounts = databaseAccounts.filter(
        dbAccount => !accounts.find(acc => acc.email === dbAccount.email),
    );
    if (deletedAccounts.length > 0)
        await knex<CesiAccount>('cesi_accounts')
            .whereIn('id', deletedAccounts.map(acc => acc.id))
            .del();

    return {
        addedAccountsCount: missingAccounts.length,
        updatedAccountsCount,
        deletedAccountsCount: deletedAccounts.length,
    };
}
