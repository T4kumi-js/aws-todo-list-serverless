import IFindTaskByIdUseCase from '../interfaces/use-cases/find-task-by-id.use-case';
import ITaskRepository from '../interfaces/repositories/task.repository';
import Task from '../domain/task';
import EntityNotFoundError from '../../../common/errors/entity-not-found.error';

class FindTaskByIdUseCase implements IFindTaskByIdUseCase {
  private taskRepository: ITaskRepository;

  constructor(dependencies: {
    taskRepository: ITaskRepository
  }) {
    this.taskRepository = dependencies.taskRepository;
  }

  async execute(taskId: string | number): Promise<Task> {
    const task = await this.taskRepository.findOneById(taskId);

    if (!task) {
      throw new EntityNotFoundError('Task', { taskId });
    }

    return task;
  }
}

export default FindTaskByIdUseCase;
