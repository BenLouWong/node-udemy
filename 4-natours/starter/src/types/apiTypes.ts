export interface Tours {
    id: number;
    name: string;
    duration?: number;
    maxGroupSize: number;
    difficulty?: string;
    ratingsAverage: number;
    ratingsQuantity: number;
    price: number;
    summary: string;
    description: string;
    imageCover?: string;
    images?: string[];
    startDates: Date[];
    createdAt: Date;
    priceDiscount?: number;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    role: "user" | "guide" | "admin";
    active: boolean;
    photo: string;
    password: string;
}