import type { HelloassoLog } from '@bde-cesi-nancy/types';
import type { Knex } from 'knex';
import { v4 as uuid } from 'uuid';

export function helloAssoLog(database: Knex,
                             input: any,
                             success: boolean,
                             rejectReason: string | null,
                             resultMembership: string | null = null) {
    const eventType = input?.eventType as 'Order' | 'Payment' | 'Form';

    return database<HelloassoLog>('helloasso_logs').insert({
        id: uuid(),
        created_at: new Date(),
        success,
        reject_reason: rejectReason,
        event_type: eventType,
        result_membership: resultMembership,
        input: typeof input === 'string' ? input : JSON.stringify(input, null, 2),
    });
}
