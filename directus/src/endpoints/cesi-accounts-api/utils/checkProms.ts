import type { Promotion } from '@bde-cesi-nancy/types';
import type { Knex } from 'knex';
import type { IAccount } from './parseCSV';

export async function checkProms(accounts: IAccount[], knex: Knex) {
    const promotionCodes = [ ...new Set(accounts.map(a => a.promCode)) ];

    const existingPromotions = await knex<Promotion>('promotions')
        .select('code')
        .then(rows => rows.map(r => r.code));

    const missingPromotions = promotionCodes.filter(code => !existingPromotions.includes(code));
    if (missingPromotions.length > 0)
        await knex('promotions').insert(missingPromotions.map(code => ({ code })));

    const deletedPromotions = existingPromotions.filter(code => !promotionCodes.includes(code));
    if (deletedPromotions.length > 0)
        await knex('promotions').whereIn('code', deletedPromotions).del();

    return { addedPromotionsCount: missingPromotions.length, deletedPromotionsCount: deletedPromotions.length };
}
