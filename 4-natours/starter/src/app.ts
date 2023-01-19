import express from 'express';
import fs from 'fs';
import { ToursResource } from './tours/toursResource';

const app = express();
app.use(express.json());

// app.use((req, res, next) => {
//     req. = new Date().getTime();
//     next();
// });

function handler(): void {
    const port = 9000;
    const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'));
    if (!isTours(tours)) {
        console.error('Data cannot be parsed correctly to object');
        return;
    }

    const tourDataService = new ToursResource(tours);
    app.route('/api/v1/tours')
        .get(tourDataService.getAllTours)
        .post(tourDataService.createTour);

    app.route('/api/v1/tours/:id')
        .get(tourDataService.getTourById)
        .patch(tourDataService.updateTour)
        .delete(tourDataService.deleteTour);

    app.listen(port, () => { console.log(`App running on localhost:${port}/`); });
}
handler();

function isTours(tours: unknown): tours is Tours[] {
    return 'ratingsAverage' in tours[0];
}

export interface Tours {
    id: number;
    name: string;
    duration: number;
    maxGroupSize: number;
    difficulty: string;
    ratingsAverage: number;
    ratingsQuantity: number;
    price: number;
    summary: string;
    description: string;
    imageCover: string;
    images: string[];
    startDates: string[];
}