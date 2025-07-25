export interface Country {
    name: string;
    code: string;
}

export interface Representative {
    name: string;
    image: string;
}

export interface Customer {
    id: number;
    name: string;
    country: Country;
    company: string;
    date: string | Date;
    status: string;
    verified: boolean;
    activity: number;
    representative: Representative;
    balance: number;
}
