import Task from '../../../domain/entities/task.entity';

interface ITaskRepository {
  create(task: Task): Promise<Task>;

  update(taskId: string, data: Task): Promise<Task>;

  remove(taskId: string): Promise<void>;

  findAll(): Promise<Task[]>;

  findOneById(taskId: string): Promise<Task | null>
}

export default ITaskRepository;
