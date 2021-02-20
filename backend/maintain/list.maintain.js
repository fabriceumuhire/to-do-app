/* eslint-disable import/extensions */
import list from '../model/list.model.js';

/*
 * Service maintain class
 * Maintain functions needed for service tasks
 */
class TodoMaintain {
  /**
   * * Creates a todo
   * @param  {object} data
   * @returns {object}
   */
  static async createTodo(data) {
    const saveTodo = await list.create(data);
    return saveTodo;
  }

  /**
   * * Find all todos
   * @returns {object}
   */
  static async findAllTodo() {
    const getTodo = await list.find();
    return getTodo;
  }

  /**
   * * Find a todo by a property
   * @param  {object} property
   * @returns {object}
   */
  static findTodoByProperty(property) {
    return list.findOne(property);
  }

  /**
   * * Update a todo by a property
   * @param  {object} id
   * @param {object} object
   * @returns {object}
   */
  static updateTodoByProperty(id, object) {
    return list.findOneAndUpdate(
      id,
      {
        $set: {
          title: object.title,
          description: object.description,
          priority: object.priority,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  /**
   * * Delete a todo by a property
   * @param  {object} property
   * @returns {object}
   */
  static deleteTodoByProperty(property) {
    return list.findByIdAndDelete(property);
  }
}

export default TodoMaintain;
