const { ICreateTaskUseCase } = require('../../interfaces/use-cases/tasks');
const ITaskRepository = require('../../interfaces/repositories/task.repository');
const Task = require('../../../domain/entities/task.entity');

/**
 * @class
 * @implements {ICreateTaskUseCase}
 */
class CreateTaskUseCase {
  /**
   * @param {{
   *   taskRepository: ITaskRepository
   * }} dependencies
   */
  constructor({ taskRepository }) {
    this.taskRepository = taskRepository;
  }

  /**
   * @param {{
   *   name: string,
   *   description: string
   * }} data
   * @returns {Promise<Task>}
   */
  async execute(data) {
    const task = new Task({
      name: data.name,
      description: data.description,
      isCompleted: false
    });

    const createdTask = await this.taskRepository.create(task);

    return createdTask;
  }
}

module.exports = CreateTaskUseCase;
