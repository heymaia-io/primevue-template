export interface Order {
    id: string;
    productCode: string;
    date: string | Date;
    amount: number;
    quantity: number;
    customer: string;
    status: string;
}

export interface Product {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
    inventoryStatus: string;
    rating: number;
    orders?: Order[];
}
