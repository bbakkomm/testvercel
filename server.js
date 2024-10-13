import 'express-async-errors';
import * as dotenv from "dotenv";
dotenv.config();

import corsOption from './routes/corsOption.js';
import cors from 'cors';

import express from "express";
export const app = express();

import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';

// routers
import studyRouter from './routes/studyRouter.js';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(cors(corsOption));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/api/v1/study', cors(corsOption), authenticateUser, studyRouter);
app.use('/api/v1/users', cors(corsOption), authenticateUser, userRouter);
app.use('/api/v1/auth', cors(corsOption), authRouter);

app.use('*', (req, res) => {
  res.sendStatus(404).json({ msg: 'not found'});
});

app.use(cors(corsOption), errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server mongoDB running ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}