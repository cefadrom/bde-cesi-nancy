import Papa from 'papaparse';

const REQUIRED_FIELDS: Partial<keyof IRawAccount>[] = [ 'id', 'displayName', 'givenName', 'surname', 'mail', 'department', 'createdDateTime' ];

export function parseCSV(rawContent: string): IParsedResult {
    const operationStart = Date.now();

    const result = Papa.parse<IRawAccount>(rawContent, {
        header: true,
    });

    for (const field of REQUIRED_FIELDS) {
        if (!result.meta.fields?.includes(field))
            return { error: `Missing field ${field}`, parseErrors: result.errors };
    }

    const filterAccounts = (account: IRawAccount): boolean =>
        account.state === 'Student'
        && account.accountEnabled === 'True'
        && (
            account.department.startsWith('NY')
            || account.department.startsWith('ND')
        );

    const accounts: IAccount[] = result.data
        .filter(filterAccounts)
        .sort((a, b) => a.displayName.localeCompare(b.displayName))
        .map(u => ({
            id: u.id,
            firstName: u.givenName,
            lastName: u.surname,
            email: u.mail,
            promCode: u.department,
            createdAt: new Date(u.createdDateTime),
        }));

    const operationEnd = Date.now();

    return {
        accounts,
        parseErrors: result.errors,
        parseMeta: {
            accountsParsed: result.data.length,
            accountsKept: accounts.length,
            operationTime: operationEnd - operationStart,
        },
    };
}


export interface IParsedResult {
    accounts?: IAccount[];
    error?: string;
    parseMeta?: {
        accountsParsed: number;
        accountsKept: number;
        operationTime: number;
    };
    parseErrors: Papa.ParseError[];
}

export interface IRawAccount {
    userPrincipalName: string;
    displayName: string;
    surname: string;
    mail: string;
    givenName: string;
    id: string;
    userType: string;
    jobTitle: string;
    department: string;
    accountEnabled: string;
    usageLocation: string;
    streetAddress: string;
    state: string;
    country: string;
    officeLocation: string;
    city: string;
    postalCode: string;
    telephoneNumber: string;
    mobilePhone: string;
    alternateEmailAddress: string;
    ageGroup: string;
    consentProvidedForMinor: string;
    legalAgeGroupClassification: string;
    companyName: string;
    creationType: string;
    directorySynced: string;
    invitationState: string;
    identityIssuer: string;
    createdDateTime: string;
}

export interface IAccount {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    promCode: string;
    createdAt: Date;
}
