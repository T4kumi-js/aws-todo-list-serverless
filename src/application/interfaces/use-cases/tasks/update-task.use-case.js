const Task = require('../../../../domain/entities/task.entity');

/**
 * @interface
 */
class IUpdateTaskUseCase {
  /**
   * @param {string} taskId
   * @param {{
   *   name: string,
   *   description: string
   * }} data
   * @returns {Promise<Task>}
   */
  execute(taskId, data) {}
}

module.exports = IUpdateTaskUseCase;
