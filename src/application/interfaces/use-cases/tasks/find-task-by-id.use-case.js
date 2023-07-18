const Task = require('../../../../domain/entities/task.entity');

/**
 * @interface
 */
class IFindTaskByIdUseCase {
  /**
   * @param {string} taskId
   * @returns {Promise<Task>}
   */
  execute(taskId) {}
}

module.exports = IFindTaskByIdUseCase;
