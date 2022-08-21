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
                const { content, status, error: readError } = await getRawCSV(
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
