const Task = require('../../../../domain/entities/task.entity');

/**
 * @interface
 */
class IFindAllTasksUseCase {
  /**
   * @returns {Promise<Task[]>}
   */
  execute() {}
}

module.exports = IFindAllTasksUseCase;
