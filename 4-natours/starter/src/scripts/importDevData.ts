import mongoose from "mongoose";
import dotenv from 'dotenv';
import fs from 'fs';
import { Tours } from "../../src/types/apiTypes";
import { tourSchema } from "../../src/models/tourModels";

dotenv.config({ path: './config.env' });

const dbConfig = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(dbConfig).then(() => {
    console.log('DB Connection Successful');
});

async function go(): Promise<void> {
    const tours = fs.readFileSync('tours-simple.json', 'utf-8');
    const mongoTourDB = mongoose.model<Tours>('Tour', tourSchema);

    try {
        await mongoTourDB.create(tours);
        // await mongoTourDB.deleteMany();
    } catch (error) {
        console.log(error);
    }
}

console.log(process.argv);
go();