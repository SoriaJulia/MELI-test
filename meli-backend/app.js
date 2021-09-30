import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import itemsRouter from "./routes/items.js";
import cors from "cors";
const app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/items', itemsRouter);

export default app;
