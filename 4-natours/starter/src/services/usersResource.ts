import { User } from '../types/apiTypes';
import type { Request, Response } from 'express';

export class UsersResource {
    private readonly user: User[];

    constructor(user?: User[]) {
        this.user = user;
    }

    public getAllUsers = (req: Request, res: Response) => {
        res.status(500).json({
            status: 'error',
            message: 'this route is not yet defined'
            // results: this.tours.length,
            // data: { tours: this.tours }
        });
    };

    public createUser = (req: Request, res: Response) => {
        res.status(500).json({
            status: 'error',
            message: 'this route is not yet defined'
        });
    };

    public getUserById = (req: Request, res: Response) => {
        res.status(500).json({
            status: 'error',
            message: 'this route is not yet defined'
        });
    };
    public updateUser = (req: Request, res: Response) => {
        res.status(500).json({
            status: 'error',
            message: 'this route is not yet defined'
        });
    };
    public deleteUser = (req: Request, res: Response) => {
        res.status(500).json({
            status: 'error',
            message: 'this route is not yet defined'
        });
    };
}