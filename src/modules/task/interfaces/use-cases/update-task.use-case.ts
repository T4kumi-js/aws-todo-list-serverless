import UpdateTaskRequest from '../../domain/update-task-request';
import Task from '../../domain/task';

interface IUpdateTaskUseCase {
  execute(taskId: string | number, data: UpdateTaskRequest): Promise<Task>;
}

export default IUpdateTaskUseCase;
