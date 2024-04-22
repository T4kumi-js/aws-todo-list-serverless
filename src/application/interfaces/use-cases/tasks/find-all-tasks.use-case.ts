import Task from '../../../../domain/entities/task.entity';

interface IFindAllTasksUseCase {
  execute(): Promise<Task[]>;
}

export default IFindAllTasksUseCase;
