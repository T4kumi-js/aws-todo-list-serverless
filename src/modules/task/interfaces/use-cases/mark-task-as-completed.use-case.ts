import Task from '../../../../domain/entities/task.entity';

interface IMarkTaskAsCompletedUseCase {
  execute(taskId: string): Promise<Task>;
}

export default IMarkTaskAsCompletedUseCase;
