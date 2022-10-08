// Directus collections
export interface User<P = string, M = string> {
    id: string,
    first_name: string,
    last_name: string,
    last_page: string | null,
    email: string,
    password: string | null,
    location: string | null,
    title: string | null,
    description: string | null,
    tags: string[] | null,
    avatar: string | null,
    language: string | null,
    theme: 'auto' | 'light' | 'dark',
    tfa_secret: string | null,
    status: string,
    role: string,
    promotion: P,
    membership_status: 'aucun' | 'adherent' | 'cotisant',
    membership: M | null,
}

// Custom collections
export interface CesiAccount {
    id: string;
    email: string;
    name: string;
    promotion: string;
}

export interface Promotion {
    code: string;
    name: string;
}

export interface UnauthorizedLogin {
    id: string;
    date_created?: Date;
    email: string;
    name: string;
}

export interface Contact<User = string> {
    id: string;
    user_created?: User,
    date_created: Date,
    user_updated?: User,
    date_updated?: Date,
    name?: string,
    email?: string,
    ip: string,
    resolved: boolean,
    category: string,
    message: string,
    subject: string,
}

export interface Club {
    id: string;
    name: string;
    description: string;
    president_name: string;
    contact_email: string;
    visible: boolean;
    thumbnail: string;
}

export interface Membership<L = string, U = string> {
    id: string;
    order_id: number;
    membership_id: number;
    order_date: Date;
    order_form: 'adhesion-bde' | 'cotisation-bde';
    order_amount: number;
    order_initial_amount: number;
    adherent_name: string;
    adherent_email: string;
    payer_name: string;
    payer_email: string;
    origin_log: L[];
    membership_user: U | null;
}

export interface HelloassoLog {
    id: string;
    reviewed: boolean;
    created_at: Date;
    success: boolean;
    reject_reason: string | null;
    event_type: 'Order' | 'Payment' | 'Form';
    result_membership: string | null;
    input: string;
    comment: string | null;
}

export interface Event {
    id: string;
    name: string;
    description: string;
    poster: string;
    visible: boolean;
    date_start: Date;
    date_end: Date | null;
    hide_hours: boolean;
    cta_text: string | null;
    cta_link: string | null;
}
