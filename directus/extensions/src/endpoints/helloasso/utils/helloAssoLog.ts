import type { HelloassoLog } from '@bde-cesi-nancy/types';


export function helloAssoLog(logService: any,
                             input: any,
                             success: boolean,
                             rejectReason: string | null = null,
                             resultMembership: string | null = null): Promise<string> {

    const eventType = input?.eventType as 'Order' | 'Payment' | 'Form';

    return logService.createOne({
        success,
        reject_reason: rejectReason,
        event_type: eventType,
        result_membership: resultMembership,
        input: typeof input === 'string' ? input : JSON.stringify(input, null, 2),
    } as Partial<HelloassoLog>);
}
