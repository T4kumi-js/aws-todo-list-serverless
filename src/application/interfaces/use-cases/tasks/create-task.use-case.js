const Task = require('../../../../domain/entities/task.entity');

/**
 * @interface
 */
class ICreateTaskUseCase {
  /**
   * @param {{
   *   name: string,
   *   description: string
   * }} data
   * @returns {Promise<Task>}
   */
  execute(data) {}
}

module.exports = ICreateTaskUseCase;
