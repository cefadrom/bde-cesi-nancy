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
