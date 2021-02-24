/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import indexRouter from './routes/index';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: '500mb',
    parameterLimit: 500,
  }),
);
app.use(bodyParser.json({ limit: '500mb' }));

// Connect to the db
const conn = process.env.MONGODB_URL;
const port = process.env.PORT;
mongoose
  .connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB Connected');
  });

// listen for request on port 3000, and as a callback function have the port listened on logged
const server = app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});

app.use('/api/v1', indexRouter);

// app.use(indexRouter);

export default app;
