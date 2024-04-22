import { IUpdateTaskUseCase, UpdateTaskRequest } from '../../interfaces/use-cases/tasks/update-task.use-case';
import ITaskRepository from '../../interfaces/repositories/task.repository';
import EntityNotFoundError from '../../errors/entity-not-found.error';
import Task from '../../../domain/entities/task.entity';

class UpdateTaskUseCase implements IUpdateTaskUseCase {
  private taskRepository: ITaskRepository;

  constructor(dependencies: { taskRepository: ITaskRepository }) {
    this.taskRepository = dependencies.taskRepository;
  }

  async execute(taskId: string, data: UpdateTaskRequest): Promise<Task> {
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
