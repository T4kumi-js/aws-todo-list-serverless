import IFindAllTasksUseCase from '../interfaces/use-cases/find-all-tasks.use-case';
import ITaskRepository from '../interfaces/repositories/task.repository';
import Task from '../domain/task';

class FindAllTasksUseCase implements IFindAllTasksUseCase {
  private taskRepository: ITaskRepository;

  constructor(dependencies: {
    taskRepository: ITaskRepository
  }) {
    this.taskRepository = dependencies.taskRepository;
  }

  async execute(): Promise<Task[]> {
    const tasks = await this.taskRepository.findAll();

    return tasks;
  }
}

export default FindAllTasksUseCase;
