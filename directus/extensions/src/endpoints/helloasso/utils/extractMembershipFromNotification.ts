import type { Notification, OrdersOrderItem, OrdersPaymentItem } from './helloAssoDefinitions';
import { EnumsItemState } from './helloAssoDefinitions';


export function extractMembershipFromNotification(notification: Notification): ExtractMembershipResult {
    if (notification.eventType === 'Form')
        return { success: false, error: 'Event type is a form' };

    const notificationMembershipItem: OrdersOrderItem | OrdersPaymentItem = (notification
        ?.data
        ?.items as any[])
        ?.find((i: OrdersOrderItem | OrdersPaymentItem) => i?.type === 'Membership');

    if (!notificationMembershipItem || !notificationMembershipItem.id)
        return { success: false, error: 'No membership found in order' };

    if (notificationMembershipItem.state !== EnumsItemState.Processed && notificationMembershipItem.state !== EnumsItemState.Registered)
        return { success: false, error: 'Membership is not processed or registered' };

    const paymentID = notification.eventType === 'Payment' ? notification.data.id : undefined;

    return { success: true, membership: notificationMembershipItem, paymentID };
}


export interface ExtractMembershipResult {
    success: boolean,
    error?: string,
    membership?: OrdersOrderItem | OrdersPaymentItem,
    paymentID?: number,
}
