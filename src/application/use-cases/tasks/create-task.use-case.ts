import { ICreateTaskUseCase, CreateTaskRequest } from '../../interfaces/use-cases/tasks/create-task.use-case';
import ITaskRepository from '../../interfaces/repositories/task.repository';
import Task from '../../../domain/entities/task.entity';

class CreateTaskUseCase implements ICreateTaskUseCase {
  private taskRepository: ITaskRepository;

  constructor(dependencies: { taskRepository: ITaskRepository }) {
    this.taskRepository = dependencies.taskRepository;
  }

  async execute(data: CreateTaskRequest): Promise<Task> {
    const task = new Task({
      name: data.name,
      description: data.description,
      isCompleted: false
    });

    const createdTask = await this.taskRepository.create(task);

    return createdTask;
  }
}

export default CreateTaskUseCase;
