import IFindAllTasksUseCase from '../../interfaces/use-cases/tasks/find-all-tasks.use-case';
import ITaskRepository from '../../interfaces/repositories/task.repository';
import Task from '../../../domain/entities/task.entity';

class FindAllTasksUseCase implements IFindAllTasksUseCase {
  private taskRepository: ITaskRepository;

  constructor(dependencies: { taskRepository: ITaskRepository }) {
    this.taskRepository = dependencies.taskRepository;
  }

  async execute(): Promise<Task[]> {
    const tasks = await this.taskRepository.findAll();

    return tasks;
  }
}

export default FindAllTasksUseCase;
