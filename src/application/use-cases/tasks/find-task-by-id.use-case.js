const { IFindTaskByIdUseCase } = require('../../interfaces/use-cases/tasks');
const ITaskRepository = require('../../interfaces/repositories/task.repository');
const EntityNotFoundError = require('../../errors/entity-not-found.error');
const Task = require('../../../domain/entities/task.entity');

/**
 * @class
 * @implements {IFindTaskByIdUseCase}
 */
class FindTaskByIdUseCase {
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
   * @returns {Promise<Task>}
   */
  async execute(taskId) {
    const task = await this.taskRepository.findOneById(taskId);

    if (!task) {
      throw new EntityNotFoundError('Task', { taskId });
    }

    return task;
  }
}

module.exports = FindTaskByIdUseCase;
