import express from 'express';
import morgan from 'morgan';
import { router as tourRouter } from './routes/tourRoutes';
import { router as userRouter } from './routes/userRoutes';

const app = express();
app.use(morgan('dev'));
app.use(express.json());

function handler(): void {
    const port = 9000;

    app.use('/api/v1/tours', tourRouter);
    app.use('/api/v1/users', userRouter);

    app.listen(port, () => { console.log(`App running on localhost:${port}/`); });
}
handler();
