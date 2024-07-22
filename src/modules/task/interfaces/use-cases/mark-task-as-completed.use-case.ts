import Task from '../../domain/task';

interface IMarkTaskAsCompletedUseCase {
  execute(taskId: string | number): Promise<Task>;
}

export default IMarkTaskAsCompletedUseCase;
