import { Tours } from "../app";
import type { Request, Response } from 'express'
import fs from 'fs'

export class ToursResource {
    private readonly tours: Tours[]

    constructor(tours: Tours[]) {
        this.tours = tours;
    }

    public getAllTours = (req: Request, res: Response) => {
        res.status(200).json({
            status: 'success',
            results: this.tours.length,
            data: { tours: this.tours }
        });
    }

    public getTourById = (req: Request, res: Response) => {
        const tour = this.tours.find(el => el.id === +req.params.id);
        if (!tour) {
            return res.status(404).json({
                status: 'fail',
                message: 'Invalid ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { tour }
        });
    }

    public updateTour = (req: Request, res: Response) => {
        res.status(200).json({
            status: 'success',
            data: {
                tour: 'Updated tour here...'
            }
        });
    }

    public deleteTour = (req: Request, res: Response) => {
        res.status(204).json({
            status: 'success',
            data: null
        });
    }

    public createTour = (req: Request, res: Response) => {
        const newId = this.tours[this.tours.length - 1].id + 1;
        const newTour = Object.assign({ id: newId }, req.body);

        this.tours.push(newTour);
        fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(this.tours), () => {
            res.status(201).json({
                status: 'success',
                data: {
                    tours: newTour
                }
            });
        });
    }
}
