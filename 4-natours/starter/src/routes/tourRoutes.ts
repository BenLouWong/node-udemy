import { Router } from "express";
import { checkPayloadBody, checkTourId, tourDataService } from "../helpers/tourHelpers";

export const router = Router();

router.use((req, res, next) => {
    console.log('Loading tour middleware');
    next();
});
router.param('id', checkTourId);

router.route('/')
    .get(tourDataService.getAllTours)
    .post(checkPayloadBody, tourDataService.createTour);

router.route('/:id')
    .get(tourDataService.getTourById)
    .patch(tourDataService.updateTour)
    .delete(tourDataService.deleteTour);

