const { IDeleteTaskUseCase } = require('../../interfaces/use-cases/tasks');
const ITaskRepository = require('../../interfaces/repositories/task.repository');
const EntityNotFoundError = require('../../errors/entity-not-found.error');

/**
 * @class
 * @implements {IDeleteTaskUseCase}
 */
class DeleteTaskUseCase {
  /**
   * @param {{
   *   taskRepository: ITaskRepository
   * }} dependencies
   */
  constructor({ taskRepository }) {
    this.taskRepository = taskRepository;
  }

  /**
   * @param {string} taskId
   * @returns {Promise<void>}
   */
  async execute(taskId) {
    const task = await this.taskRepository.findOneById(taskId);

    if (!task) {
      throw new EntityNotFoundError('Task', { taskId });
    }

    await this.taskRepository.remove(taskId);
  }
}

module.exports = DeleteTaskUseCase;
