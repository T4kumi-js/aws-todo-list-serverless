const IUpdateTaskUseCase = require('../../interfaces/use-cases/tasks/create-task.use-case');
const ITaskRepository = require('../../interfaces/repositories/task.repository');
const EntityNotFoundError = require('../../errors/entity-not-found.error');
const Task = require('../../../domain/entities/task.entity');

/**
 * @class
 * @implements {IUpdateTaskUseCase}
 */
class UpdateTaskUseCase {
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
   * @param {{
   *   name: string,
   *   description: string
   * }} data
   * @returns {Promise<Task>}
   */
  async execute(taskId, data) {
    const task = await this.taskRepository.findOneById(taskId);

    if (!task) {
      throw new EntityNotFoundError('Task', { taskId });
    }

    task.name = data.name ?? task.name;
    task.description = data.description ?? task.description;

    const updatedTask = await this.taskRepository.update(taskId, task);

    return updatedTask;
  }
}

module.exports = UpdateTaskUseCase;
