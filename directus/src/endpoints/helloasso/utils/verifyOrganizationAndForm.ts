import { OrdersItemDetail } from './helloAssoDefinitions';


export function verifyOrganizationAndForm(membership: OrdersItemDetail, allowedForms: string[], allowedOrganization: string): VerifyOrganizationAndFormResult {
    if (membership?.order?.organizationSlug?.replace(/ /g, '-') !== allowedOrganization)
        return { success: false, error: 'Organization slug does not match' };

    if (!membership?.order?.formSlug)
        return { success: false, error: 'No form slug found in the notification' };

    if (!allowedForms.includes(membership.order.formSlug))
        return { success: false, error: 'Form slug does not match' };

    return { success: true };
}


export interface VerifyOrganizationAndFormResult {
    success: boolean,
    error?: string,
}
