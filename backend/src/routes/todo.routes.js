/* eslint-disable import/extensions */
import { Router } from 'express';
import {
  validateListBody,
  validateUpdateListBody,
} from '../middlewares/validation.js';
import ListController from '../controllers/controller.js';

const {
  createTodo,
  getAllTodo,
  getTodoById,
  updateTodo,
  deleteTodoById,
} = ListController;

const router = Router();

router.post('/', validateListBody, createTodo);

router.get('/', getAllTodo);

router.get('/:id', getTodoById);

router.patch('/:id', validateUpdateListBody, updateTodo);

router.delete('/:id', deleteTodoById);

export default router;
