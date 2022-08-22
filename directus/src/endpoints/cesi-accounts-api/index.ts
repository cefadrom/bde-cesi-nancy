import type { EndpointConfig } from '@types';
import { checkAccounts } from './utils/checkAccounts';
import { checkProms } from './utils/checkProms';
import { getRawCSV } from './utils/getRawCSV';
import { parseCSV } from './utils/parseCSV';

export default {
    id: 'cesi-accounts-api',
    handler: (router, context) => {
        router.post('/', async (req, res) => {
            try {
                if (!req.accountability?.admin)
                    return res.status(403).json({ error: 'Forbidden' });

                const { content, status, error: readError, filename, filesize } = await getRawCSV(
                    req,
                    context.database,
                    context.env.STORAGE_LOCAL_ROOT,
                );
                if (readError || !content)
                    return res.status(status || 400).json({ error: readError || 'Unknown error when reading CSV' });

                const {
                    accounts: parsedAccounts,
                    parseMeta,
                    parseErrors,
                    error: internalParseError,
                } = parseCSV(content);
                if (internalParseError || !parsedAccounts)
                    return res.status(500).json({ error: internalParseError || 'Unknown error when parsing CSV' });

                const databaseUpdateStart = Date.now();
                const {
                    addedPromotionsCount,
                    deletedPromotionsCount,
                } = await checkProms(parsedAccounts, context.database);
                const {
                    addedAccountsCount,
                    updatedAccountsCount,
                    deletedAccountsCount,
                } = await checkAccounts(parsedAccounts, context.database);
                const databaseUpdateEnd = Date.now();

                const dumpDate = new Date((filename?.match(/\d{4}-\d{1,2}-\d{1,2}/) as string[])[0] || 0);

                await context.database('cesi_accounts_updates').insert({
                    user_created: req.accountability.user,
                    date_created: new Date(),
                    dump_filename: filename,
                    dump_size: filesize,
                    dump_lines: parseMeta!.accountsParsed,
                    dump_date: !isNaN(dumpDate.getFullYear()) && dumpDate.getFullYear() >= 2022 ? dumpDate : null,
                    found_accounts: parseMeta!.accountsKept,
                    updated_accounts: updatedAccountsCount,
                    added_accounts: addedAccountsCount,
                    deleted_accounts: deletedAccountsCount,
                    added_promotions: addedPromotionsCount,
                    deleted_promotions: deletedPromotionsCount,
                    operations_total: updatedAccountsCount + addedAccountsCount + deletedAccountsCount + addedPromotionsCount + deletedPromotionsCount,
                });

                return res.json({
                    parseMeta,
                    parseErrors,
                    addedPromotionsCount,
                    deletedPromotionsCount,
                    addedAccountsCount,
                    updatedAccountsCount,
                    deletedAccountsCount,
                    databaseUpdateDuration: databaseUpdateEnd - databaseUpdateStart,
                });
            } catch (error) {
                context.logger.error(error);
                return res.status(500).json({ error: error instanceof Error ? error.message : (error as any).toString() });
            }
        });
    },
} as EndpointConfig;
