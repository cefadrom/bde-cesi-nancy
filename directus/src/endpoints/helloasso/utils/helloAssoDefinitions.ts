export type TokenStore = { access: string };

export interface OrderNotification {
    eventType: 'Order';
    data: OrdersOrderDetail;
}

export interface PaymentNotification {
    eventType: 'Payment';
    data: OrdersPaymentDetail;
}

export interface FormNotification {
    eventType: 'Form';
    data: FormsFormPublicModel;
}

export type Notification = OrderNotification | PaymentNotification | FormNotification;


/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CartsCheckoutIntentResponse {
    /**
     * Metadata (Json object)
     * Only if metadata were sent on the checkout form initialization
     */
    metadata?: object;

    /** Order linked to the checkout intent, if the payment was successfully made */
    order?: OrdersOrderDetail;

    /**
     * Id of the checkout intent
     * @format int32
     */
    id?: number;

    /** Url where the contributor must be redirected to */
    redirectUrl?: string;
}

export enum EnumsFormType {
    CrowdFunding = 'CrowdFunding',
    Membership = 'Membership',
    Event = 'Event',
    Donation = 'Donation',
    PaymentForm = 'PaymentForm',
    Checkout = 'Checkout',
    Shop = 'Shop',
}

export interface OrdersOrderDetail {
    payer?: OrdersPayer;

    /**
     * Metadata (Json object)
     * Only if metadata were sent on a checkout form initialization
     */
    metadata?: object;

    /** All items of the order */
    items?: OrdersOrderItem[];

    /** All payments of the order */
    payments?: OrdersOrderPayment[];

    /** Total amount of the order */
    amount?: OrdersOrderAmountModel;

    /**
     * The ID of the Order
     * @format int32
     */
    id?: number;

    /**
     * Order creation date
     * @format date-time
     */
    date?: string;

    /** FormSlug (lowercase name of the form without special characters) */
    formSlug?: string;

    /** The type of the form */
    formType?: EnumsFormType;

    /** The organization name. */
    organizationName?: string;

    /** OrganizationSlug (lowercase name of the organization without special characters) */
    organizationSlug?: string;

    /** Meta CreatedDate/UpdatedDate */
    meta?: CommonMetaModel;
}

export interface OrdersPayer {
    /**
     * Gets or Sets date of birth
     * @format date-time
     */
    dateOfBirth?: string;
    email?: string;

    /** Gets or Sets Address */
    address?: string;

    /** Gets or Sets City */
    city?: string;

    /** Gets or Sets ZipCode */
    zipCode?: string;

    /** Gets or Sets Country */
    country?: string;

    /** Gets or Sets Company */
    company?: string;
    firstName?: string;
    lastName?: string;
}

/**
 * Enum which represents the membership validity type
 * `MovingYear` - Moving Year : valid until the same day next year.
 * `Custom` - Custom : use start and end dates specified on the form
 * `Illimited` - Illimited : no end to validity
 */
export enum EnumsMembershipValidityType {
    MovingYear = 'MovingYear',
    Custom = 'Custom',
    Illimited = 'Illimited',
}

/**
 * * `Public` - The form is publicly visible and findable on search engines
 * `Private` - The form is visible only with the URL, you cannot find it on search engines
 * `Draft` - The form is not yet published but visible if you have admin rights
 * `Disabled` - The form is disabled and can be reenabled by changing state to public or private
 */
export enum EnumsFormState {
    Public = 'Public',
    Private = 'Private',
    Draft = 'Draft',
    Disabled = 'Disabled',
}

/**
 * FormPublicModel class
 */
export interface FormsFormPublicModel {
    /** Organization Logo */
    organizationLogo?: string;

    /** Organization Name */
    organizationName?: string;

    /** Tiers */
    tiers?: FormsTierPublicModel[];

    /** Activity type of the event eg. "Atelier(s) / Stage(s)" matching one of the provided type values <a href="index#!/Values/Values_Get"> provided here</a> or a custom value is allowed. */
    activityType?: string;

    /**
     * Activity type identifier
     * @format int32
     */
    activityTypeId?: number;

    /** Place */
    place?: CommonPlaceModel;

    /**
     * The datetime (Inclusive) at which the sales end.
     * If null the orders will be available until the end of the campaign.
     * @format date-time
     */
    saleEndDate?: string;

    /**
     * The datetime (Inclusive) at which the users can start placing orders.
     * If null the orders will be available as soon as the campaign is published.
     * @format date-time
     */
    saleStartDate?: string;

    /** Validity Type : until when the membership is valid (if applicable) */
    validityType?: EnumsMembershipValidityType;

    /** Banner */
    banner?: CommonDocumentModel;

    /** Currency */
    currency?: string;

    /** Short description (one line) */
    description?: string;

    /**
     * The datetime of the activity start
     * @format date-time
     */
    startDate?: string;

    /**
     * The datetime of the activity end
     * @format date-time
     */
    endDate?: string;

    /** Logo */
    logo?: CommonDocumentModel;

    /** Meta */
    meta?: CommonMetaModel;

    /** State */
    state?: EnumsFormState;

    /** Title */
    title?: string;

    /** Private Title */
    privateTitle?: string;

    /** Url of the widget button */
    widgetButtonUrl?: string;

    /** Url of the form widget */
    widgetFullUrl?: string;

    /** Url of the horizontal vignette widget */
    widgetVignetteHorizontalUrl?: string;

    /** Url of the vertical vignette widget */
    widgetVignetteVerticalUrl?: string;

    /** The form slug */
    formSlug?: string;

    /** The form type */
    formType?: EnumsFormType;

    /** The form url */
    url?: string;

    /** The organization slug */
    organizationSlug?: string;
}

export enum EnumsOrganizationType {
    Association1901Rig = 'Association1901Rig',
    Association1901Rup = 'Association1901Rup',
    Association1901 = 'Association1901',
    FondationRup = 'FondationRup',
    FondDotation = 'FondDotation',
    FondationSousEgide = 'FondationSousEgide',
    FondationScientifique = 'FondationScientifique',
    FondationPartenariale = 'FondationPartenariale',
    FondationUniversitaire = 'FondationUniversitaire',
    FondationHospitaliere = 'FondationHospitaliere',
    Association1905 = 'Association1905',
    Association1905Rup = 'Association1905Rup',
    Entreprise = 'Entreprise',
    Cooperative = 'Cooperative',
    Etablissement = 'Etablissement',
    Association1908 = 'Association1908',
    Association1908Rig = 'Association1908Rig',
    Association1908Rup = 'Association1908Rup',
}

export enum HelloAssoModelsEnumsGlobalRole {
    OrganizationAdmin = 'OrganizationAdmin',
    FormAdmin = 'FormAdmin',
    GroupAdmin = 'GroupAdmin',
}

/**
 * OrganizationsModel class
 */
export interface OrganizationOrganizationModel {
    /** The organization is authenticated. Property returned only when asked by an organization admin. */
    isAuthenticated?: boolean;

    /** The organization banner */
    banner?: string;

    /**
     * The organism can issue fiscal receipts (type ok and has not deactivated it)
     * Must configure it and be authenticated to become enabled
     */
    fiscalReceiptEligibility?: boolean;

    /** The organism is eligible, has set up his options, and is authenticated. */
    fiscalReceiptIssuanceEnabled?: boolean;

    /** The organization type */
    type?: EnumsOrganizationType;

    /** Organization category label */
    category?: string;

    /** Organization Address (for authorized applications or if authorized by the organization) */
    address?: string;

    /** Organization Geolocation (for authorized applications or if authorized by the organization) */
    geolocation?: HelloAssoModelsSharedGeoLocation;

    /** Logo of organization */
    logo?: string;

    /** Name of organization */
    name?: string;

    /** Organization Role */
    role?: HelloAssoModelsEnumsGlobalRole;

    /** Organization city */
    city?: string;

    /** Organization zip code */
    zipCode?: string;

    /** Organization description */
    description?: string;

    /** The organization url */
    url?: string;

    /** The organization slug */
    organizationSlug?: string;
}

/**
 * * `Fixed`
 * `Pwyw` - Pay what you want (with or without a minimum amount)
 * `Free`
 */
export enum EnumsPriceCategory {
    Fixed = 'Fixed',
    Pwyw = 'Pwyw',
    Free = 'Free',
}

export enum EnumsTierType {
    Donation = 'Donation',
    Payment = 'Payment',
    Registration = 'Registration',
    Membership = 'Membership',
    MonthlyDonation = 'MonthlyDonation',
    MonthlyPayment = 'MonthlyPayment',
    OfflineDonation = 'OfflineDonation',
    Contribution = 'Contribution',
    Bonus = 'Bonus',
    Product = 'Product',
}

/**
 * * `Processed` - The item is paid and is valid
 * `Registered` - The item has been registered manually by the organization and is valid
 * `Unknown`
 * `Canceled` - The item has been canceled, and is no longer valid
 */
export enum EnumsItemState {
    Processed = 'Processed',
    Registered = 'Registered',
    Unknown = 'Unknown',
    Canceled = 'Canceled',
}

/**
 * Item on the order
 */
export interface OrdersOrderItem {
    /** Payments linked to this item and each share between the item and the payment */
    payments?: OrdersSharePayment[];
    name?: string;

    /** User : participant/member/adherent specified on the item */
    user?: OrdersUser;

    /** PriceCategory : Free, Fixed or Pay what you want */
    priceCategory?: EnumsPriceCategory;

    /**
     * Minimum amount that was specified on the tier (in cents)
     * @format int32
     */
    minAmount?: number;

    /** The discount code used on the item */
    discount?: OrdersItemDiscount;

    /** Custom fields related to this item */
    customFields?: OrdersItemCustomField[];

    /** Extra options taken with this item */
    options?: OrdersItemOption[];

    /** The Ticket Url */
    ticketUrl?: string;

    /** The Membership Card Url */
    membershipCardUrl?: string;

    /**
     * The day of levy for monthly donation only
     * @format int32
     */
    dayOfLevy?: number;

    /** Tier description */
    tierDescription?: string;

    /**
     * ID of the Item
     * @format int32
     */
    id?: number;

    /**
     * Total item Price in cents (after discount without extra options)
     * @format int32
     */
    amount?: number;

    /** Type of the used tariff */
    type?: EnumsTierType;

    /**
     * The raw amount (without reduction)
     * @format int32
     */
    initialAmount?: number;

    /** State of this item */
    state?: EnumsItemState;
}

export enum EnumsPaymentCashOutState {
    MoneyIn = 'MoneyIn',
    CantTransferReceiverFull = 'CantTransferReceiverFull',
    Transfered = 'Transfered',
    Refunded = 'Refunded',
    Refunding = 'Refunding',
    WaitingForCashOutConfirmation = 'WaitingForCashOutConfirmation',
    CashedOut = 'CashedOut',
    Unknown = 'Unknown',
    Contested = 'Contested',
    TransferInProgress = 'TransferInProgress',
}

export enum EnumsPaymentMeans {
    None = 'None',
    Card = 'Card',
    Sepa = 'Sepa',
    Check = 'Check',
}

/**
 * * `Pending` - A payment scheduled at a later date, not yet processed.
 * `Authorized` - The payment has been authorized, validated, processed.
 * `Refused` - The payment has been refused by the bank.
 * `Unknown`
 * `Registered` - Represents a payment made offline.
 Probably for an item of type
 * `Refunded` - The payment has been refunded.
 * `Refunding` - The payment is being refunded.
 * `Contested` - Payment has been contested by the contributor
 */
export enum EnumsPaymentState {
    Pending = 'Pending',
    Authorized = 'Authorized',
    Refused = 'Refused',
    Unknown = 'Unknown',
    Registered = 'Registered',
    Refunded = 'Refunded',
    Refunding = 'Refunding',
    Contested = 'Contested',
}

/**
 * * `Offline` - A payment made outside the website
 * `Credit` - Payment to be made to the organization
 * `Debit` - Payment for balance adjustment
 */
export enum EnumsPaymentType {
    Offline = 'Offline',
    Credit = 'Credit',
    Debit = 'Debit',
}

export enum FormsAdminPaymentOffLineMeansModel {
    Cash = 'Cash',
    Check = 'Check',
    BankTransfer = 'BankTransfer',
}

/**
 * Payment on the order
 */
export interface OrdersOrderPayment {
    /** Items linked to this payment and each share between the item and the payment */
    items?: OrdersShareItem[];

    /**
     * The date of the cash out
     * @format date-time
     */
    cashOutDate?: string;

    /** The cash out state : payment transfer status */
    cashOutState?: EnumsPaymentCashOutState;

    /** The Payment Receipt Url */
    paymentReceiptUrl?: string;

    /** The Fiscal Receipt Url */
    fiscalReceiptUrl?: string;

    /**
     * The ID of the payment
     * @format int32
     */
    id?: number;

    /**
     * Total Amount of the payment (in cents)
     * @format int32
     */
    amount?: number;

    /**
     * Tip Amount of the payment (in cents)
     * @format int32
     */
    amountTip?: number;

    /**
     * Date of the payment
     * @format date-time
     */
    date?: string;

    /** The payment means used */
    paymentMeans?: EnumsPaymentMeans;

    /** Payment state */
    state?: EnumsPaymentState;

    /** Payment type : a payment with a 'REGISTERED' state can be of three different types, OFFLINE, CREDIT or DEBIT (adjustment) */
    type?: EnumsPaymentType;

    /** Meta CreatedDate/UpdatedDate */
    meta?: CommonMetaModel;

    /** Payment off line mean */
    paymentOffLineMean?: FormsAdminPaymentOffLineMeansModel;
}

export interface OrdersOrderAmountModel {
    /**
     * Total amount in cents
     * @format int32
     */
    total?: number;

    /**
     * Vat amount in cents
     * @format int32
     */
    vat?: number;

    /**
     * Discount amount in cents
     * @format int32
     */
    discount?: number;
}

/**
 * MetaModel class
 */
export interface CommonMetaModel {
    /**
     * CreatedAt
     * @format date-time
     */
    createdAt?: string;

    /**
     * UpdateAt
     * @format date-time
     */
    updatedAt?: string;
}

/**
 * * `Single` - A one time payment
 * `Installment` - A multiple tume payment with predefined due dates
 * `Monthly` - A monthly payment until a date
 */
export enum EnumsPaymentFrequencyType {
    Single = 'Single',
    Installment = 'Installment',
    Monthly = 'Monthly',
}

/**
 * TierPublicModel class
 */
export interface FormsTierPublicModel {
    /**
     * id
     * @format int32
     */
    id?: number;

    /** label */
    label?: string;

    /** description */
    description?: string;

    /** tierType */
    tierType?: EnumsTierType;

    /**
     * the Price in cents
     * if price equals 0 then it is free or there is a MinAmount
     * @format int32
     */
    price?: number;

    /**
     * Vat rate if applicable
     * Amount have to be 0.10 for 10%
     * @format double
     */
    vatRate?: number;

    /**
     * If set, it means the payment is free to choose, according to the specified minAmount in cents
     * @format int32
     */
    minAmount?: number;

    /** Type of payment frequency */
    paymentFrequency?: EnumsPaymentFrequencyType;

    /**
     * Max quantity buyable in this cart
     * @format int32
     */
    maxPerUser?: number;

    /** meta */
    meta?: CommonMetaModel;

    /**
     * The datetime (Inclusive) at which the users can start buying this tier.
     * If null the tier will be available at the start of the event.
     * @format date-time
     */
    saleStartDate?: string;

    /**
     * The datetime (Inclusive) at which the tier is no longer available.
     * If null the tier will be available until the end of the event.
     * @format date-time
     */
    saleEndDate?: string;

    /** Whether this is eligible to a deduction */
    isEligibleTaxReceipt?: boolean;

    /** Terms of tier */
    terms?: FormsTermModel[];

    /** Picture, used only for Shop Form */
    picture?: CommonDocumentModel;
}

/**
 * PlaceModel class
 */
export interface CommonPlaceModel {
    /** Address */
    address?: string;

    /** Name of the place */
    name?: string;

    /** City */
    city?: string;

    /** ZipCode */
    zipCode?: string;

    /** 3 letter country code */
    country?: string;

    /** Geolocation (latitude and longitude), filled on directory routes */
    geoLocation?: HelloAssoModelsSharedGeoLocation;
}

/**
 * DocumentModel class
 */
export interface CommonDocumentModel {
    /** The file name of document */
    fileName?: string;

    /** The public url of document */
    publicUrl?: string;
}

/**
 * Contact class
 */
export interface CommonContactModel {
    /** Contact email */
    email?: string;

    /** Contact phone number */
    phoneNumber?: string;
}

export interface HelloAssoModelsSharedGeoLocation {
    /** @format double */
    latitude?: number;

    /** @format double */
    longitude?: number;
}

export interface OrdersSharePayment {
    /**
     * Id of the payment
     * @format int32
     */
    id?: number;

    /**
     * Amount of the item payed on this payment term (in cents)
     * @format int32
     */
    shareAmount?: number;
}

export interface OrdersUser {
    firstName?: string;
    lastName?: string;
}

export interface OrdersItemDiscount {
    /** The discount code applied on the item */
    code?: string;

    /**
     * The discount amount in cents
     * @format int32
     */
    amount?: number;
}

/**
 * * `Date` - This field represent a date matching ISO 8601 DateTimeOffset
 * `TextInput` - This fields in limited text 250 char
 * `FreeText` - Same as TextInput
 * `ChoiceList` - A multi choice list, with values specified int the field definition
 * `File` - A file to be uploaded
 * `YesNo` - A simple checkbox
 * `Phone` - The field should be a phone number
 * `Zipcode` - The field should be a valid phone number
 * `Number` - The field should be a number
 */
export enum EnumsFieldType {
    Date = 'Date',
    TextInput = 'TextInput',
    FreeText = 'FreeText',
    ChoiceList = 'ChoiceList',
    File = 'File',
    YesNo = 'YesNo',
    Phone = 'Phone',
    Zipcode = 'Zipcode',
    Number = 'Number',
}

/**
 * Custom field associated with the item or option
 */
export interface OrdersItemCustomField {
    name?: string;

    /** The type of the field */
    type?: EnumsFieldType;

    /** Participant or user answer */
    answer?: string;
}

/**
 * ItemOption class
 */
export interface OrdersItemOption {
    /** Name of the option */
    name?: string;

    /**
     * Amount of the option in cents
     * @format int32
     */
    amount?: number;

    /**
     * * `Fixed`
     * * `Pwyw` - Pay what you want (with or without a minimum amount)
     * * `Free`
     */
    priceCategory?: EnumsPriceCategory;

    /** Option is required or optional */
    isRequired?: boolean;

    /** Custom fields related to this option */
    customFields?: OrdersItemCustomField[];
}

export interface OrdersShareItem {
    /**
     * Id of the order item
     * @format int32
     */
    id?: number;

    /**
     * Amount of the payment assigned to the item and its options (in cents)
     * @format int32
     */
    shareAmount?: number;

    /**
     * Amount of the item payed on this payment term (in cents)
     * @format int32
     */
    shareItemAmount?: number;

    /**
     * Amount of all extra options linked to this item and payed on this payment (in cents)
     * @format int32
     */
    shareOptionsAmount?: number;
}

/**
 * TermsModel class
 */
export interface FormsTermModel {
    /**
     * Term Date
     * @format date-time
     */
    date?: string;

    /**
     * Term Amount
     * @format int32
     */
    amount?: number;
}

/**
 * @example {"totalAmount":7000,"initialAmount":3000,"itemName":"Adhesion Football","backUrl":"https://www.partnertest.com/cancel.php","errorUrl":"https://www.partnertest.com/error.php","returnUrl":"https://www.partnertest.com/return.php","containsDonation":true,"terms":[{"amount":2000,"date":"2022-10-15T00:00:00+02:00"},{"amount":2000,"date":"2022-11-15T00:00:00+01:00"}],"payer":{"firstName":"John","lastName":"Doe","email":"john.doe@test.com","dateOfBirth":"1986-07-06T00:00:00+02:00","address":"23 rue du palmier","city":"Paris","zipCode":"75000","country":"FRA","companyName":"Hello Asso"},"metadata":{"reference":12345,"libelle":"Adhesion Football","userId":98765,"produits":[{"id":56,"count":1},{"id":78,"count":3}]},"trackingParameter":"101"}
 */
export interface CartsInitCheckoutBody {
    /**
     * Total amount, all taxes included, in cents (required)
     * Must be equal to the sum of the initial amount and subsequent terms
     * @format int32
     */
    totalAmount: number;

    /**
     * The amount for the first term, all taxes included, in cents (required)
     * @format int32
     */
    initialAmount: number;

    /**
     * Item name (required)
     * A text describing what the user paid for ('Renew license', '3 tickets', donation, etc).
     * Will be displayed in the near future in the user space and in the organization back office
     */
    itemName: string;

    /** Url followed by the contributor if he wants to return to its previous site */
    backUrl: string;

    /** Url called in case of an error during the checkout process */
    errorUrl: string;

    /** Url called after the payment */
    returnUrl: string;

    /** The sale (or a part of) is a donation */
    containsDonation: boolean;

    /** The list of future terms (if applicable) */
    terms?: CartsCheckoutTerm[];

    /** The payer (optional) */
    payer?: CartsCheckoutPayer;

    /**
     * Metadata (optional)
     * Json object (max length : 20000)
     */
    metadata?: object;

    /** Affilae tracking parameter (optional) */
    trackingParameter?: string;
}

export interface CartsCheckoutTerm {
    /**
     * Term amount, all taxes included, in cents
     * @format int32
     */
    amount: number;

    /**
     * Term date
     * @format date-time
     */
    date: string;
}

export interface CartsCheckoutPayer {
    /** FirstName */
    firstName?: string;

    /** LastName */
    lastName?: string;

    /** Email */
    email?: string;

    /**
     * Date of birth (Date only, no time part)
     * @format date-time
     */
    dateOfBirth?: string;

    /** Address */
    address?: string;

    /** City */
    city?: string;

    /** ZipCode */
    zipCode?: string;

    /** 3 letter country code */
    country?: string;

    /** Used if the payer is a company */
    companyName?: string;
}

export interface CartsInitCheckoutResponse {
    /**
     * Id of the checkout intent
     * @format int32
     */
    id?: number;

    /** Url where the contributor must be redirected to */
    redirectUrl?: string;
}

/**
 * @example {"formZipCodes":["33000","33100"],"formActivityType":["Danse","Football"],"formStartDateMin":"2021-08-22T02:00:00+02:00","formHasRemainingEntries":true,"organizationFiscalReceiptEligibility":true}
 */
export interface DirectoryListFormsRequest {
    /** Textual search for form name */
    formName?: string;

    /** Textual search for form description */
    formDescription?: string;

    /** The zip codes where the forms are located */
    formZipCodes?: string[];

    /** The cities where the forms are located */
    formCities?: string[];

    /** The regions where the forms are located */
    formRegions?: string[];

    /** The departments where the forms are located */
    formDepartments?: string[];

    /** The countries where the forms are located */
    formCountries?: string[];

    /** The form types : CrowdFunding, Membership, Event, Donation, PaymentForm ... */
    formTypes?: EnumsFormType[];

    /** The Activity Type of the form */
    formActivityType?: string[];

    /**
     * The minimum publication date of the forms, format "yyyy-MM-ddTHH:mm:ss.fffK"
     * @format date-time
     */
    formPublicationStartDateMin?: string;

    /**
     * The maximum publication date of the forms, format "yyyy-MM-ddTHH:mm:ss.fffK"
     * @format date-time
     */
    formPublicationStartDateMax?: string;

    /**
     * The minimum start date of the forms, format "yyyy-MM-ddTHH:mm:ss.fffK"
     * @format date-time
     */
    formStartDateMin?: string;

    /**
     * The maximum start date of the forms, format "yyyy-MM-ddTHH:mm:ss.fffK"
     * @format date-time
     */
    formStartDateMax?: string;

    /**
     * The maximum end date of the forms, format "yyyy-MM-ddTHH:mm:ss.fffK"
     * @format date-time
     */
    formEndDateMax?: string;

    /**
     * The minimum end date of the forms, format "yyyy-MM-ddTHH:mm:ss.fffK"
     * @format date-time
     */
    formEndDateMin?: string;

    /** Allow only free forms if true */
    formIsFree?: boolean;

    /** Allow only forms with remaning entries if true */
    formHasRemainingEntries?: boolean;

    /** Textual search for organization name */
    organizationName?: string;

    /** Textual search for organization description */
    organizationDescription?: string;

    /** The categories of the forms */
    organizationCategories?: string[];

    /** The organization types */
    organizationTypes?: string[];

    /** The zip codes where the organizations are located */
    organizationZipCodes?: string[];

    /** The cities where the organizations are located */
    organizationCities?: string[];

    /** The regions where the organizations are located */
    organizationRegions?: string[];

    /** The departments where the organizations are located */
    organizationDepartments?: string[];

    /** Allow only organization with a fiscal receipt eligibility */
    organizationFiscalReceiptEligibility?: boolean;

    /**
     * Allow only forms with internal tags
     * this filter is for special operations only
     */
    internalTags?: string[];

    /** Allow only forms with public tags */
    tags?: string[];
}

/**
 * ResultsWithPaginationModel class
 */
export interface CommonResultsWithPaginationModelOfDirectorySynchronizableFormModel {
    /** Data property */
    data?: DirectorySynchronizableFormModel[];

    /** Pagination info */
    pagination?: CommonPaginationModel;
}

export enum EnumsRecordActionType {
    Insert = 'Insert',
    Delete = 'Delete',
}

/**
 * SynchronizableFormModel class
 */
export interface DirectorySynchronizableFormModel {
    /** Record Action Type : Delete or Insert */
    action?: EnumsRecordActionType;

    /** Form to synchronise : is either a {HelloAsso.Api.V5.Models.Forms.FormBasicModel} if action is Delete, or a {HelloAsso.Api.V5.Models.Forms.FormPublicModel} */
    record?: FormsFormBasicModel;
}

/**
 * Pagination model class
 */
export interface CommonPaginationModel {
    /**
     * Page size
     * @format int32
     */
    pageSize?: number;

    /**
     * Total number of results available
     * @format int32
     */
    totalCount?: number;

    /**
     * Current page index
     * @format int32
     */
    pageIndex?: number;

    /**
     * Total number of pages of results with current page size
     * @format int32
     */
    totalPages?: number;

    /** Continuation Token to get next results */
    continuationToken?: string;
}

/**
 * A basic form model
 */
export interface FormsFormBasicModel {
    /** The form slug */
    formSlug?: string;

    /** The form type */
    formType?: EnumsFormType;

    /** The form url */
    url?: string;

    /** The organization slug */
    organizationSlug?: string;
}

/**
 * @example {"zipCodes":["33000","33100"],"fiscalReceiptEligibility":true}
 */
export interface DirectoryListOrganizationsRequest {
    /** Textual search for organization name */
    name?: string;

    /** Textual search for organization description */
    description?: string;

    /** The categories of the organizations */
    categories?: string[];

    /** The organization types */
    types?: string[];

    /** The zip codes where the organizations are located */
    zipCodes?: string[];

    /** The cities where the organizations are located */
    cities?: string[];

    /** The regions where the organizations are located */
    regions?: string[];

    /** The departments where the organizations are located */
    departments?: string[];

    /** Allow only organization with a fiscal receipt eligibility */
    fiscalReceiptEligibility?: boolean;

    /**
     * Allow only Organization with internal tags
     * this filter is for special operations only
     */
    internalTags?: string[];

    /** Allow only Organization with public tags */
    tags?: string[];
}

/**
 * ResultsWithPaginationModel class
 */
export interface CommonResultsWithPaginationModelOfDirectorySynchronizableOrganizationModel {
    /** Data property */
    data?: DirectorySynchronizableOrganizationModel[];

    /** Pagination info */
    pagination?: CommonPaginationModel;
}

/**
 * SynchronizableOrganizationModel class
 */
export interface DirectorySynchronizableOrganizationModel {
    /** Record Action Type : Delete or Insert */
    action?: EnumsRecordActionType;

    /** Organization to synchronise : is either a {HelloAsso.Api.V5.Models.Organization.OrganizationBasicModel} if action is Delete, or a {HelloAsso.Api.V5.Models.Directory.DirectoryOrganizationPublicModel} */
    record?: OrganizationOrganizationBasicModel;
}

/**
 * A basic organization model
 */
export interface OrganizationOrganizationBasicModel {
    /** The organization url */
    url?: string;

    /** The organization slug */
    organizationSlug?: string;
}

/**
 * ResultsWithPaginationModel class
 */
export interface CommonResultsWithPaginationModelOfFormsFormLightModel {
    /** Data property */
    data?: FormsFormLightModel[];

    /** Pagination info */
    pagination?: CommonPaginationModel;
}

/**
 * FormLightModel class
 */
export interface FormsFormLightModel {
    /** Banner */
    banner?: CommonDocumentModel;

    /** Currency */
    currency?: string;

    /** Short description (one line) */
    description?: string;

    /**
     * The datetime of the activity start
     * @format date-time
     */
    startDate?: string;

    /**
     * The datetime of the activity end
     * @format date-time
     */
    endDate?: string;

    /** Logo */
    logo?: CommonDocumentModel;

    /** Meta */
    meta?: CommonMetaModel;

    /** State */
    state?: EnumsFormState;

    /** Title */
    title?: string;

    /** Private Title */
    privateTitle?: string;

    /** Url of the widget button */
    widgetButtonUrl?: string;

    /** Url of the form widget */
    widgetFullUrl?: string;

    /** Url of the horizontal vignette widget */
    widgetVignetteHorizontalUrl?: string;

    /** Url of the vertical vignette widget */
    widgetVignetteVerticalUrl?: string;

    /** The form slug */
    formSlug?: string;

    /** The form type */
    formType?: EnumsFormType;

    /** The form url */
    url?: string;

    /** The organization slug */
    organizationSlug?: string;
}

/**
 * @example {"tierList":[{"label":"tarif 1","price":1000},{"label":"tarif 2","price":2000}],"description":"description","title":"event name","activityTypeId":1,"place":{"address":"1 rue paris","name":"address name","city":"bordeaux","zipCode":"33000","country":"france"},"acceptOpenDonation":true,"allowComment":false,"amountVisible":false,"displayContributorName":false,"displayParticipantsCount":false,"displayRemainingEntries":false,"generateMembershipCards":true,"generateTickets":true,"invertDescriptions":false}
 */
export interface FormsFormQuickCreateRequest {
    tierList?: FormsTierLightModel[];

    /** The banner of the form */
    banner?: string;

    /** The description of form */
    description?: string;

    /**
     * The datetime of the activity end
     * @format date-time
     */
    endDate?: string;

    /** The logo of the form */
    logo?: string;

    /** Private Title : displayed only in the organization back office */
    privateTitle?: string;

    /**
     * The datetime of the activity start
     * @format date-time
     */
    startDate?: string;

    /** The title of the form. It will be used to generate the url which that can't be changed. */
    title: string;

    /**
     * Activity type identifier, matching one of the provided type values <a href="index#!/Values/Values_Get"> provided here</a>
     * @format int32
     */
    activityTypeId?: number;

    /** The place of the form */
    place?: CommonPlaceModel;

    /**
     * The datetime (Inclusive) at which the sales end.
     * If null the orders will be available until the end of the campaign.
     * @format date-time
     */
    saleEndDate?: string;

    /**
     * The datetime (Inclusive) at which the users can start placing orders.
     * If null the orders will be available as soon as the campaign is published.
     * @format date-time
     */
    saleStartDate?: string;

    /** Membership validity type. */
    validityType?: EnumsMembershipValidityType;

    /** Whether the user will be allowed to make open donation with an order. The amount of the donation is open, but 3 presets can be set in OpenDonationPresetAmount */
    acceptOpenDonation?: boolean;

    /** allowComment */
    allowComment?: boolean;

    /** amountVisible */
    amountVisible?: boolean;

    /** The color of the form */
    color?: string;

    /** Contact information */
    contact?: CommonContactModel;

    /** Display contributor name for fundraiser */
    displayContributorName?: boolean;

    /** Indicates that the members count must be displayed on the form. */
    displayParticipantsCount?: boolean;

    /** Indicates that the remaining entries must be displayed on the form. */
    displayRemainingEntries?: boolean;

    /**
     * Indicates the financial goal (amount of money raised) for the whole form. Null means no goal.
     * @format int64
     */
    financialGoal?: number;

    /** Entrust the issuance of membership cards to HelloAsso (automatically sent by email to participants) */
    generateMembershipCards?: boolean;

    /** Entrust the issuance of tickets to HelloAsso (automatically sent by email to participants) */
    generateTickets?: boolean;

    /** Allows you to add the long description above the store catalog. */
    invertDescriptions?: boolean;

    /** Label conditions and terms file */
    labelConditionsAndTermsFile?: string;

    /** The long description of the form (rich Html) */
    longDescription?: string;

    /** The preset amounts to be shown to the user. Maximum 3 amounts. */
    openDonationPresetAmounts?: number[];

    /** Personalized message for participants */
    personalizedMessage?: string;

    /** The project beneficiaries of the form (rich Html) */
    projectBeneficiaries?: string;

    /** Details of the project expenses (rich Html) */
    projectExpensesDetails?: string;

    /** Description of the project owners (rich Html) */
    projectOwners?: string;

    /** 3 letter country code */
    projectTargetCountry?: string;

    /**
     * Indicates the maximum available entries for the whole form. Null means unlimited entries.
     * @format int32
     */
    maxEntries?: number;
}

export interface FormsTierLightModel {
    label?: string;

    /** @format int32 */
    price?: number;
}

export interface FormsFormQuickCreateModel {
    formSlug?: string;
    organizationSlug?: string;
    publicUrl?: string;
}

export interface OrdersItemDetail {
    payer?: OrdersPayer;

    /**
     * Metadata (Json object)
     * Only if metadata were sent on a checkout form initialization
     */
    metadata?: object;
    order?: OrdersOrderLight;

    /** Payments linked to this item */
    payments?: OrdersItemPayment[];
    name?: string;

    /** User : participant/member/adherent specified on the item */
    user?: OrdersUser;

    /** PriceCategory : Free, Fixed or Pay what you want */
    priceCategory?: EnumsPriceCategory;

    /**
     * Minimum amount that was specified on the tier (in cents)
     * @format int32
     */
    minAmount?: number;

    /** The discount code used on the item */
    discount?: OrdersItemDiscount;

    /** Custom fields related to this item */
    customFields?: OrdersItemCustomField[];

    /** Extra options taken with this item */
    options?: OrdersItemOption[];

    /** The Ticket Url */
    ticketUrl?: string;

    /** The Membership Card Url */
    membershipCardUrl?: string;

    /**
     * The day of levy for monthly donation only
     * @format int32
     */
    dayOfLevy?: number;

    /** Tier description */
    tierDescription?: string;

    /**
     * ID of the Item
     * @format int32
     */
    id?: number;

    /**
     * Total item Price in cents (after discount without extra options)
     * @format int32
     */
    amount?: number;

    /** Type of the used tariff */
    type?: EnumsTierType;

    /**
     * The raw amount (without reduction)
     * @format int32
     */
    initialAmount?: number;

    /** State of this item */
    state?: EnumsItemState;
}

export interface OrdersOrderLight {
    /**
     * The ID of the Order
     * @format int32
     */
    id?: number;

    /**
     * Order creation date
     * @format date-time
     */
    date?: string;

    /** FormSlug (lowercase name of the form without special characters) */
    formSlug?: string;

    /** The type of the form */
    formType?: EnumsFormType;

    /** The organization name. */
    organizationName?: string;

    /** OrganizationSlug (lowercase name of the organization without special characters) */
    organizationSlug?: string;

    /** Meta CreatedDate/UpdatedDate */
    meta?: CommonMetaModel;
}

/**
 * Payment linked to the item
 */
export interface OrdersItemPayment {
    /** The cash out state */
    cashOutState?: EnumsPaymentCashOutState;

    /**
     * Amount of the item and extra options payed on this payment term (in cents)
     * @format int32
     */
    shareAmount?: number;

    /**
     * The ID of the payment
     * @format int32
     */
    id?: number;

    /**
     * Total Amount of the payment (in cents)
     * @format int32
     */
    amount?: number;

    /**
     * Tip Amount of the payment (in cents)
     * @format int32
     */
    amountTip?: number;

    /**
     * Date of the payment
     * @format date-time
     */
    date?: string;

    /** The payment means used */
    paymentMeans?: EnumsPaymentMeans;

    /** Payment state */
    state?: EnumsPaymentState;

    /** Payment type : a payment with a 'REGISTERED' state can be of three different types, OFFLINE, CREDIT or DEBIT (adjustment) */
    type?: EnumsPaymentType;

    /** Meta CreatedDate/UpdatedDate */
    meta?: CommonMetaModel;

    /** Payment off line mean */
    paymentOffLineMean?: FormsAdminPaymentOffLineMeansModel;
}

/**
 * ResultsWithPaginationModel class
 */
export interface CommonResultsWithPaginationModelOfOrdersItem {
    /** Data property */
    data?: OrdersItem[];

    /** Pagination info */
    pagination?: CommonPaginationModel;
}

/**
 * An item of an order
 */
export interface OrdersItem {
    order?: OrdersOrderLight;
    payer?: OrdersPayerLight;

    /** Payments linked to this item */
    payments?: OrdersItemPayment[];
    name?: string;

    /** User : participant/member/adherent specified on the item */
    user?: OrdersUser;

    /** PriceCategory : Free, Fixed or Pay what you want */
    priceCategory?: EnumsPriceCategory;

    /**
     * Minimum amount that was specified on the tier (in cents)
     * @format int32
     */
    minAmount?: number;

    /** The discount code used on the item */
    discount?: OrdersItemDiscount;

    /** Custom fields related to this item */
    customFields?: OrdersItemCustomField[];

    /** Extra options taken with this item */
    options?: OrdersItemOption[];

    /** The Ticket Url */
    ticketUrl?: string;

    /** The Membership Card Url */
    membershipCardUrl?: string;

    /**
     * The day of levy for monthly donation only
     * @format int32
     */
    dayOfLevy?: number;

    /** Tier description */
    tierDescription?: string;

    /**
     * ID of the Item
     * @format int32
     */
    id?: number;

    /**
     * Total item Price in cents (after discount without extra options)
     * @format int32
     */
    amount?: number;

    /** Type of the used tariff */
    type?: EnumsTierType;

    /**
     * The raw amount (without reduction)
     * @format int32
     */
    initialAmount?: number;

    /** State of this item */
    state?: EnumsItemState;
}

export interface OrdersPayerLight {
    email?: string;

    /** Gets or Sets Address */
    address?: string;

    /** Gets or Sets City */
    city?: string;

    /** Gets or Sets ZipCode */
    zipCode?: string;

    /** Gets or Sets Country */
    country?: string;

    /** Gets or Sets Company */
    company?: string;
    firstName?: string;
    lastName?: string;
}

/**
 * ResultsWithPaginationModel class
 */
export interface CommonResultsWithPaginationModelOfOrdersOrder {
    /** Data property */
    data?: OrdersOrder[];

    /** Pagination info */
    pagination?: CommonPaginationModel;
}

export interface OrdersOrder {
    payer?: OrdersPayerLight;

    /** All items of the order */
    items?: OrdersOrderItem[];

    /** All payments of the order */
    payments?: OrdersOrderPayment[];

    /** Total amount of the order */
    amount?: OrdersOrderAmountModel;

    /**
     * The ID of the Order
     * @format int32
     */
    id?: number;

    /**
     * Order creation date
     * @format date-time
     */
    date?: string;

    /** FormSlug (lowercase name of the form without special characters) */
    formSlug?: string;

    /** The type of the form */
    formType?: EnumsFormType;

    /** The organization name. */
    organizationName?: string;

    /** OrganizationSlug (lowercase name of the organization without special characters) */
    organizationSlug?: string;

    /** Meta CreatedDate/UpdatedDate */
    meta?: CommonMetaModel;
}

export interface AccountApiClientsPublicPutPartnerApiClientRequest {
    /** Partner domain : Url used to grant authorization redirection */
    domain?: string;
}

export interface AccountApiClientModel {
    id?: string;

    /** Filled only when requested by the organization back office */
    secret?: string;
    partnerName?: string;
    privileges?: string[];
    domain?: string;
}

export interface ApiNotificationsPostApiUrlNotificationBody {
    /** The Api notification Url */
    url: string;
}

export interface PartnerPartnerPublicModel {
    /** Name of the partner */
    name?: string;

    /** Description of the partner */
    description?: string;

    /** Website of the partner */
    url?: string;

    /** Logo of the partner */
    logo?: string;

    /** ApiClient of the partner */
    client?: AccountApiClientModel;

    /** Url Notification of the partner */
    urlNotificationList?: ApiNotificationsApiUrlNotificationModel[];
}

/**
 * Organization notification URL Model class
 */
export interface ApiNotificationsApiUrlNotificationModel {
    /** The notification Url */
    url?: string;
}

export interface OrdersPaymentDetail {
    payer?: OrdersPayer;

    /** The order of this payment */
    order?: OrdersOrderLight;

    /** Items linked to this payment */
    items?: OrdersPaymentItem[];

    /**
     * The date of the cash out
     * @format date-time
     */
    cashOutDate?: string;

    /** The cash out state : payment transfer status */
    cashOutState?: EnumsPaymentCashOutState;

    /** The Payment Receipt Url */
    paymentReceiptUrl?: string;

    /** The Fiscal Receipt Url */
    fiscalReceiptUrl?: string;

    /**
     * The ID of the payment
     * @format int32
     */
    id?: number;

    /**
     * Total Amount of the payment (in cents)
     * @format int32
     */
    amount?: number;

    /**
     * Tip Amount of the payment (in cents)
     * @format int32
     */
    amountTip?: number;

    /**
     * Date of the payment
     * @format date-time
     */
    date?: string;

    /** The payment means used */
    paymentMeans?: EnumsPaymentMeans;

    /** Payment state */
    state?: EnumsPaymentState;

    /** Payment type : a payment with a 'REGISTERED' state can be of three different types, OFFLINE, CREDIT or DEBIT (adjustment) */
    type?: EnumsPaymentType;

    /** Meta CreatedDate/UpdatedDate */
    meta?: CommonMetaModel;

    /** Payment off line mean */
    paymentOffLineMean?: FormsAdminPaymentOffLineMeansModel;
}

/**
 * Item linked to a payment
 */
export interface OrdersPaymentItem {
    /**
     * Amount of the payment assigned to the item and its options (in cents)
     * @format int32
     */
    shareAmount?: number;

    /**
     * Amount of the item payed on this payment term (in cents)
     * @format int32
     */
    shareItemAmount?: number;

    /**
     * Amount of all extra options linked to this item and payed on this payment (in cents)
     * @format int32
     */
    shareOptionsAmount?: number;

    /**
     * ID of the Item
     * @format int32
     */
    id?: number;

    /**
     * Total item Price in cents (after discount without extra options)
     * @format int32
     */
    amount?: number;

    /** Type of the used tariff */
    type?: EnumsTierType;

    /**
     * The raw amount (without reduction)
     * @format int32
     */
    initialAmount?: number;

    /** State of this item */
    state?: EnumsItemState;
}

/**
 * ResultsWithPaginationModel class
 */
export interface CommonResultsWithPaginationModelOfOrdersPayment {
    /** Data property */
    data?: OrdersPayment[];

    /** Pagination info */
    pagination?: CommonPaginationModel;
}

export interface OrdersPayment {
    /** The order of this payment */
    order?: OrdersOrderLight;

    /** The payer of this payment */
    payer?: OrdersPayerLight;

    /** Items linked to this payment */
    items?: OrdersPaymentItem[];

    /**
     * The date of the cash out
     * @format date-time
     */
    cashOutDate?: string;

    /** The cash out state : payment transfer status */
    cashOutState?: EnumsPaymentCashOutState;

    /** The Payment Receipt Url */
    paymentReceiptUrl?: string;

    /** The Fiscal Receipt Url */
    fiscalReceiptUrl?: string;

    /**
     * The ID of the payment
     * @format int32
     */
    id?: number;

    /**
     * Total Amount of the payment (in cents)
     * @format int32
     */
    amount?: number;

    /**
     * Tip Amount of the payment (in cents)
     * @format int32
     */
    amountTip?: number;

    /**
     * Date of the payment
     * @format date-time
     */
    date?: string;

    /** The payment means used */
    paymentMeans?: EnumsPaymentMeans;

    /** Payment state */
    state?: EnumsPaymentState;

    /** Payment type : a payment with a 'REGISTERED' state can be of three different types, OFFLINE, CREDIT or DEBIT (adjustment) */
    type?: EnumsPaymentType;

    /** Meta CreatedDate/UpdatedDate */
    meta?: CommonMetaModel;

    /** Payment off line mean */
    paymentOffLineMean?: FormsAdminPaymentOffLineMeansModel;
}

/**
 * OrganizationLightModel class
 */
export interface OrganizationOrganizationLightModel {
    /** Logo of organization */
    logo?: string;

    /** Name of organization */
    name?: string;

    /** Organization Role */
    role?: HelloAssoModelsEnumsGlobalRole;

    /** Organization city */
    city?: string;

    /** Organization zip code */
    zipCode?: string;

    /** Organization description */
    description?: string;

    /** The organization url */
    url?: string;

    /** The organization slug */
    organizationSlug?: string;
}

export interface AccountOrganismCategoryModel {
    /** @format int32 */
    id?: number;
    label?: string;
    shortLabel?: string;
}

/**
 * PublicNameTagModel class
 */
export interface PublicTagModel {
    /** Name tag */
    name?: string;

    /**
     * Tag score : measure tag relevance
     * @format double
     */
    score?: number;
}
