const { IMarkTaskAsCompletedUseCase } = require('../../interfaces/use-cases/tasks');
const ITaskRepository = require('../../interfaces/repositories/task.repository');
const EntityNotFoundError = require('../../errors/entity-not-found.error');
const Task = require('../../../domain/entities/task.entity');

/**
 * @class
 * @implements {IMarkTaskAsCompletedUseCase}
 */
class MarkTaskAsCompletedUseCase {
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

    task.isCompleted = true;

    const completedTask = await this.taskRepository.update(taskId, task);

    return completedTask;
  }
}

module.exports = MarkTaskAsCompletedUseCase;
