/* eslint-disable import/extensions */
import status from 'http-status';
import ListMaintain from './list.maintain.js';
import ResponseUtil from '../utils/response.util.js';

const {
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
  BAD_REQUEST,
} = status;

/**
 * TODO controller class
 */
class ListController {
  /**
   * @param  {object} req
   * @param  {object} res
   * @returns {object} function to create a list
   */
  static async createTodo(req, res) {
    try {
      const { title, description, priority } = req.body;
      const todo = await ListMaintain.createTodo({
        title,
        description,
        priority,
      });
      ResponseUtil.setSuccess(
        CREATED,
        'To DO has been created successfully',
        todo,
      );
      return ResponseUtil.send(res);
    } catch (error) {
      ResponseUtil.setError(INTERNAL_SERVER_ERROR, error.message);
      return ResponseUtil.send(res);
    }
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @returns {object} function to get a list by id
   */
  static async getTodoById(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        ResponseUtil.setError(BAD_REQUEST, 'Invalid request');
        return ResponseUtil.send(res);
      }
      const todo = await ListMaintain.findTodoByProperty({
        _id: id,
      });
      if (todo) {
        ResponseUtil.setSuccess(
          OK,
          `${id} retrieved successfully`,
          todo,
        );
        return ResponseUtil.send(res);
      }
      ResponseUtil.setError(NOT_FOUND, error.message);
      return ResponseUtil.send(res);
    } catch (error) {
      ResponseUtil.setError(INTERNAL_SERVER_ERROR, error.toString());
      return ResponseUtil.send(res);
    }
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @returns {object} function to get a list of all todos
   */
  static async getAllTodo(req, res) {
    try {
      const todo = await ListMaintain.findAllTodo();
      if (todo) {
        ResponseUtil.setSuccess(
          OK,
          `All todos retrieved successfully`,
          todo,
        );
        return ResponseUtil.send(res);
      }
      ResponseUtil.setError(NOT_FOUND, error.message);
      return ResponseUtil.send(res);
    } catch (error) {
      ResponseUtil.setError(INTERNAL_SERVER_ERROR, error.message);
      return ResponseUtil.send(res);
    }
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @returns {object} function to get a list of all todos
   */
  static async updateTodo(req, res) {
    try {
      const { id } = req.params;
      const findTodo = await ListMaintain.findTodoByProperty({
        _id: id,
      });
      if (findTodo) {
        const todo = await ListMaintain.updateTodoByProperty(
          id,
          req.body,
        );
        ResponseUtil.setSuccess(
          OK,
          `Todo updated successfully`,
          todo,
        );
        return ResponseUtil.send(res);
      }
      ResponseUtil.setError(
        NOT_FOUND,
        'Todo with this id does not exist',
      );
      return ResponseUtil.send(res);
    } catch (error) {
      ResponseUtil.setError(INTERNAL_SERVER_ERROR, error.toString());
      return ResponseUtil.send(res);
    }
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @returns {object} function to delete a todo by id
   */
  static async deleteTodoById(req, res) {
    try {
      const { id } = req.params;
      const todo = await ListMaintain.deleteTodoByProperty({
        _id: id,
      });
      if (todo) {
        ResponseUtil.setSuccess(
          OK,
          `${id} deleted successfully`,
          todo,
        );
        return ResponseUtil.send(res);
      }
      ResponseUtil.setError(
        NOT_FOUND,
        'Todo with this id does not exist',
      );
      return ResponseUtil.send(res);
    } catch (error) {
      ResponseUtil.setError(INTERNAL_SERVER_ERROR, error.toString());
      return ResponseUtil.send(res);
    }
  }
}

export default ListController;
