import IUpdateTaskUseCase from '../interfaces/use-cases/update-task.use-case';
import ITaskRepository from '../interfaces/repositories/task.repository';
import UpdateTaskRequest from '../domain/update-task-request';
import Task from '../domain/task';
import EntityNotFoundError from '../../../common/errors/entity-not-found.error';

class UpdateTaskUseCase implements IUpdateTaskUseCase {
  private taskRepository: ITaskRepository;

  constructor(dependencies: {
    taskRepository: ITaskRepository
  }) {
    this.taskRepository = dependencies.taskRepository;
  }

  async execute(taskId: string | number, data: UpdateTaskRequest): Promise<Task> {
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

export default UpdateTaskUseCase;
