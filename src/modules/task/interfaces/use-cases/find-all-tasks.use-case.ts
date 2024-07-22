import Task from '../../domain/task';

interface IFindAllTasksUseCase {
  execute(): Promise<Task[]>;
}

export default IFindAllTasksUseCase;
