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
