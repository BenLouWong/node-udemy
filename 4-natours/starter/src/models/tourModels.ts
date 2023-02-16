import mongoose from "mongoose";
import { Tours } from "../types/apiTypes";

export const tourSchema = new mongoose.Schema<Required<Tours>>({
    name: {
        type: String,
        required: [true, 'Tour must have a name'],
        unique: true,
        trim: true
    },
    duration: {
        type: Number
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'Tour must have a group size']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    difficulty: {
        type: String
    },
    priceDiscount: {
        type: Number
    },
    price: {
        type: Number,
        required: [true, 'Tour must have a price']
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'Tour must have an image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date]
});
