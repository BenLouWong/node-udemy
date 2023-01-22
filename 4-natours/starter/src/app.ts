import express from 'express';
import morgan from 'morgan';
import { router as tourRouter } from './routes/tourRoutes';
import { router as userRouter } from './routes/userRoutes';

export const app = express();
app.use(morgan('dev'));
app.use(express.json());

function handler(): void {
    app.use('/api/v1/tours', tourRouter);
    app.use('/api/v1/users', userRouter);
}
handler();
