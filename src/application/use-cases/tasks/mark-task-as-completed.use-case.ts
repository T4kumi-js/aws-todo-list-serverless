import IMarkTaskAsCompletedUseCase from '../../interfaces/use-cases/tasks/mark-task-as-completed.use-case';
import ITaskRepository from '../../interfaces/repositories/task.repository';
import EntityNotFoundError from '../../errors/entity-not-found.error';
import Task from '../../../domain/entities/task.entity';

class MarkTaskAsCompletedUseCase implements IMarkTaskAsCompletedUseCase {
  private taskRepository: ITaskRepository;

  constructor(dependencies: { taskRepository: ITaskRepository }) {
    this.taskRepository = dependencies.taskRepository;
  }

  async execute(taskId: string): Promise<Task> {
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
