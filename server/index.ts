import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Application = express();

app.use(cookieParser());
app.use(
  cors({
    origin: (origin: any, callback) => {
      if ([process.env.CLIENT].indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

const port = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI as string);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
