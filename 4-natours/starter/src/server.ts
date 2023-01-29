import { app } from "./app";
import mongoose from "mongoose";

const dbConfig = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(dbConfig).then(() => {
    console.log('DB Connection Successful');
});

const port = process.env.PORT ?? 9000;
app.listen(port, () => { console.log(`App running on localhost:${port}/`); });
