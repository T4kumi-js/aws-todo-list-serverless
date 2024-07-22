import Task from '../../../../domain/entities/task.entity';

type UpdateTaskRequest = {
  name: string;
  description: string;
};

interface IUpdateTaskUseCase {
  execute(taskId: string, data: UpdateTaskRequest): Promise<Task>;
}

export {
  IUpdateTaskUseCase,
  UpdateTaskRequest
};
