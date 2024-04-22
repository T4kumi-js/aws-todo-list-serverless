import Task from '../../../../domain/entities/task.entity';

type CreateTaskRequest = {
  name: string;
  description: string;
};

interface ICreateTaskUseCase {
  execute(data: CreateTaskRequest): Promise<Task>;
}

export {
  ICreateTaskUseCase,
  CreateTaskRequest
};
