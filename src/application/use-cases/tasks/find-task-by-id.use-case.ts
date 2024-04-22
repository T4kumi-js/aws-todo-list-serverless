import IFindTaskByIdUseCase from '../../interfaces/use-cases/tasks/find-task-by-id.use-case';
import ITaskRepository from '../../interfaces/repositories/task.repository';
import EntityNotFoundError from '../../errors/entity-not-found.error';
import Task from '../../../domain/entities/task.entity';

class FindTaskByIdUseCase implements IFindTaskByIdUseCase {
  private taskRepository: ITaskRepository;

  constructor(dependencies: { taskRepository: ITaskRepository }) {
    this.taskRepository = dependencies.taskRepository;
  }

  async execute(taskId: string): Promise<Task> {
    const task = await this.taskRepository.findOneById(taskId);

    if (!task) {
      throw new EntityNotFoundError('Task', { taskId });
    }

    return task;
  }
}

export default FindTaskByIdUseCase;
