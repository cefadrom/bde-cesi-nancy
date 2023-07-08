import nodeFetch from 'node-fetch';
import type {
    OrdersItemDetail,
    OrdersOrderItem,
    OrdersPaymentDetail,
    OrdersPaymentItem,
    TokenStore,
} from './helloAssoDefinitions';

export async function fetchMembershipDetails(notificationMembership: OrdersOrderItem | OrdersPaymentItem,
                                             paymentID: number | undefined,
                                             tokens: TokenStore,
                                             HELLO_ASSO_ENDPOINT: string): Promise<ExtractMembershipResult> {
    try {

        // Fetch membership details
        const membershipDetailsRes = await nodeFetch(`${HELLO_ASSO_ENDPOINT}/v5/items/${notificationMembership.id}?withDetails=true`, {
            headers: {
                'Authorization': `Bearer ${tokens.access}`,
            },
        });

        if (!membershipDetailsRes.ok)
            throw new Error(`HelloAsso API returned ${membershipDetailsRes.status} ${membershipDetailsRes.statusText} for order`);

        const membership = await membershipDetailsRes.json() as OrdersItemDetail;

        // Fetch payment details if provided
        let payment: OrdersPaymentDetail | undefined;
        if (paymentID) {
            const paymentDetailsRes = await nodeFetch(`${HELLO_ASSO_ENDPOINT}/v5/payments/${paymentID}`, {
                headers: {
                    'Authorization': `Bearer ${tokens.access}`,
                },
            });

            if (!paymentDetailsRes.ok)
                throw new Error(`HelloAsso API returned ${paymentDetailsRes.status} ${paymentDetailsRes.statusText} for payment`);

            payment = await paymentDetailsRes.json() as OrdersPaymentDetail;
        }

        return { success: true, membership, payment };

    } catch (e) {
        const error = e instanceof Error ? e.message : (e as string);
        return { success: false, error: `Failed to fetch membership details: ${error}` };
    }
}


export interface ExtractMembershipResult {
    success: boolean,
    error?: string,
    membership?: OrdersItemDetail,
    payment?: OrdersPaymentDetail,
}
