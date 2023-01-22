import { Router } from "express";
import { ToursResource } from "../services/toursResource";
import fs from 'fs';
import { checkIfTours } from "../helpers/tourHelpers";

export const router = Router();
console.log('parsing tours');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`, 'utf-8'));
console.log('tours parsed');
const tourDataService = new ToursResource(checkIfTours(tours));

router.route('/')
    .get(tourDataService.getAllTours)
    .post(tourDataService.createTour);

router.route('/:id')
    .get(tourDataService.getTourById)
    .patch(tourDataService.updateTour)
    .delete(tourDataService.deleteTour);

