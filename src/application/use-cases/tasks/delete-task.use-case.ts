import IDeleteTaskUseCase from '../../interfaces/use-cases/tasks/delete-task.use-case';
import ITaskRepository from '../../interfaces/repositories/task.repository';
import EntityNotFoundError from '../../errors/entity-not-found.error';

class DeleteTaskUseCase implements IDeleteTaskUseCase {
  private taskRepository: ITaskRepository;

  constructor(dependencies: { taskRepository: ITaskRepository }) {
    this.taskRepository = dependencies.taskRepository;
  }

  async execute(taskId: string): Promise<void> {
    const task = await this.taskRepository.findOneById(taskId);

    if (!task) {
      throw new EntityNotFoundError('Task', { taskId });
    }

    await this.taskRepository.remove(taskId);
  }
}

export default DeleteTaskUseCase;
