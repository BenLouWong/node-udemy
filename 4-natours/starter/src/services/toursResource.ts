import { Tours } from "../types/apiTypes";
// import { Tour } from "../models/tourModels";
import type { Request, Response } from 'express';
import mongoose, { Model, Schema } from "mongoose";

export class ToursResource {
    private readonly Tour: Model<Tours>;

    constructor(tourSchema: Schema) {
        this.Tour = mongoose.model<Tours>('Tour', tourSchema);
    }

    public getAllTours = async (req: Request, res: Response) => {
        try {
            const tours = await this.Tour.find();
            res.status(200).json({
                status: 'success',
                results: tours.length,
                data: { tours: tours }
            });
        } catch (error) {
            res.status(404).json({
                status: 'fail',
                message: error
            })
        }
    };

    public getTourById = async (req: Request, res: Response) => {
        try {
            const tour = await this.Tour.findById(req.params.id);
            res.status(200).json({
                status: 'success',
                data: { tour }
            });
        } catch (error) {
            res.status(404).json({
                status: 'fail',
                message: error
            })
        }
    };

    public updateTour = async (req: Request, res: Response) => {
        try {
            const tour = await this.Tour.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })

            res.status(200).json({
                status: 'success',
                data: { tour }
            });
        } catch (error) {
            res.status(404).json({
                status: 'fail',
                message: error
            })
        }
    };

    public deleteTour = async (req: Request, res: Response) => {
        try {
            await this.Tour.findByIdAndDelete(req.params.id)
            res.status(204).json({
                status: 'success',
                data: null
            });
        } catch (error) {
            res.status(404).json({
                status: 'fail',
                message: error
            })
        }
    };

    public createTour = async (req: Request, res: Response) => {
        try {
            const newTour = await this.Tour.create(req.body);
            res.status(201).json({
                status: 'success',
                data: {
                    tours: newTour
                }
            });
        } catch (error) {
            res.status(400).json({
                status: 'fail',
                message: error
            })
        }
    };

    public deleteAllTours = async (req: Request, res: Response) => {
        try {
            await this.Tour.deleteMany();
            res.status(202).json({
                status: 'success'
            });
        } catch (error) {
            res.status(400).json({
                status: 'fail',
                message: error
            })
        }
    }
}
