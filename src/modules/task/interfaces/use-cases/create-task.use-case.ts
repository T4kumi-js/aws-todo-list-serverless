import CreateTaskRequest from '../../domain/create-task-request';
import Task from '../../domain/task';

interface ICreateTaskUseCase {
  execute(data: CreateTaskRequest): Promise<Task>;
}

export default ICreateTaskUseCase;
