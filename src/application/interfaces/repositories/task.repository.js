const Task = require('../../../domain/entities/task.entity');

/**
 * @interface
 */
class ITaskRepository {
  /**
   * @param {Task} task
   * @returns {Promise<Task>}
   */
  create(task) {}

  /**
   * @param {string} taskId
   * @param {Task} task
   * @returns {Promise<Task>}
   */
  update(taskId, data) {}

  /**
   * @param {string} taskId
   * @returns {Promise<void>}
   */
  remove(taskId) {}

  /**
   * @returns {Promise<Task[]>}
   */
  findAll() {}

  /**
   * @param {string} taskId
   * @returns {Promise<Task?>}
   */
  findOneById(taskId) {}
}

module.exports = ITaskRepository;
