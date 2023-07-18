const Task = require('../../../../domain/entities/task.entity');

/**
 * @interface
 */
class IMarkTaskAsCompletedUseCase {
  /**
   * @param {string} taskId
   * @returns {Promise<Task>}
   */
  execute(taskId) {}
}

module.exports = IMarkTaskAsCompletedUseCase;
