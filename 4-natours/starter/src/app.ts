import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { router as tourRouter } from './routes/tourRoutes';
import { router as userRouter } from './routes/userRoutes';

export const app = express();

function handler(): void {
    dotenv.config({ path: './config.env' });
    console.log(process.env);

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    app.use(express.json());
    app.use(express.static(`${__dirname}/../public`));

    app.use('/api/v1/tours', tourRouter);
    app.use('/api/v1/users', userRouter);
}
handler();
