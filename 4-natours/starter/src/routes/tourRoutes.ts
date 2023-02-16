import { Router } from "express";
import { tourSchema } from "../models/tourModels";
import { ToursResource } from "../services/toursResource";

export const router = Router();
const tourDataService = new ToursResource(tourSchema);

router.use((req, res, next) => {
    console.log('Loading tour middleware');
    next();
});

router.route('/')
    .get(tourDataService.getAllTours)
    .post(tourDataService.createTour)
    .delete(tourDataService.deleteAllTours);

router.route('/:id')
    .get(tourDataService.getTourById)
    .patch(tourDataService.updateTour)
    .delete(tourDataService.deleteTour);

