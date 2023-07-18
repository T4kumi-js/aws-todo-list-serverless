const { IFindAllTasksUseCase } = require('../../interfaces/use-cases/tasks');
const ITaskRepository = require('../../interfaces/repositories/task.repository');
const Task = require('../../../domain/entities/task.entity');

/**
 * @class
 * @implements {IFindAllTasksUseCase}
 */
class FindAllTasksUseCase {
  /**
   * @param {{
   *   taskRepository: ITaskRepository
   * }} dependencies
   */
  constructor({ taskRepository }) {
    this.taskRepository = taskRepository;
  }

  /**
   * @returns {Promise<Task[]>}
   */
  async execute() {
    const tasks = await this.taskRepository.findAll();

    return tasks;
  }
}

module.exports = FindAllTasksUseCase;
