export type TokenStore = { access: string };


export interface HelloAssoPayeer {
    dateOfBirth: string,
    email: string,
    firstName: string,
    lastName: string,
}


export type HelloAssoPriceCategory = 'Fixed' | 'Pwyw' | 'Free';
export type HelloAssoPurchaseState = 'Processed' | 'Registered' | 'Unknown' | 'Canceled';


export interface HelloassoOrderCallback {
    eventType: 'Order' | 'Payment',
    data: {
        payer: HelloAssoPayeer,
        items: [ HelloassoMembershipPurchase ],
        amount: {
            total: number,
            vat: number,
            discount: number,
        },
        id: number,
        date: string,
        formSlug: string,
        formType: string,
        organizationName: string,
        organizationSlug: string,
        meta: {
            createdAt: string,
            updatedAt: string,
        },
    },
}


export interface HelloassoMembershipPurchase {
    name: string,
    user: {
        firstName: string,
        lastName: string
    },
    priceCategory: HelloAssoPriceCategory,
    customFields: [
        {
            name: string,
            type: 'TextInput',
            answer: string,
        }
    ],
    tierDescription: string,
    id: number,
    amount: number,
    type: 'Membership',
    initialAmount: number,
    state: HelloAssoPurchaseState,
}


export interface HelloAssoMembershipItem {
    payer: HelloAssoPayeer,
    order: {
        id: number,
        date: string,
        formSlug: string,
        formType: string,
        organizationName: string,
        organizationSlug: string,
        formName: string,
        meta: {
            createdAt: string,
            updatedAt: string
        },
    },
    name: string,
    user: {
        firstName: string,
        lastName: string,
    },
    priceCategory: HelloAssoPriceCategory,
    customFields: [
        {
            name: string,
            type: 'TextInput',
            answer: string,
        }
    ],
    tierDescription: string,
    id: number,
    amount: number,
    type: 'Membership',
    initialAmount: number,
    state: HelloAssoPurchaseState,
}
