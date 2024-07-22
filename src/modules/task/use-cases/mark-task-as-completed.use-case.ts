import IMarkTaskAsCompletedUseCase from '../interfaces/use-cases/mark-task-as-completed.use-case';
import ITaskRepository from '../interfaces/repositories/task.repository';
import Task from '../domain/task';
import EntityNotFoundError from '../../../common/errors/entity-not-found.error';

class MarkTaskAsCompletedUseCase implements IMarkTaskAsCompletedUseCase {
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

    task.isCompleted = true;

    const completedTask = await this.taskRepository.update(taskId, task);

    return completedTask;
  }
}

export default MarkTaskAsCompletedUseCase;
