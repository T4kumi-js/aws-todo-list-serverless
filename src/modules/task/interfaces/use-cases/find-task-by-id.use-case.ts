import Task from '../../domain/task';

interface IFindTaskByIdUseCase {
  execute(taskId: string | number): Promise<Task>;
}

export default IFindTaskByIdUseCase;
