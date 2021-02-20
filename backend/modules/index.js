/* eslint-disable import/extensions */
import { Router } from 'express';
import todoRouter from './todo/todo.routes.js';

const indexRouter = Router();

indexRouter.use('/list', todoRouter);

export default indexRouter;
