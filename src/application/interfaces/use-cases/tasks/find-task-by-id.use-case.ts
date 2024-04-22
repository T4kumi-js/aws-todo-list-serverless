import Task from '../../../../domain/entities/task.entity';

interface IFindTaskByIdUseCase {
  execute(taskId: string): Promise<Task>;
}

export default IFindTaskByIdUseCase;
