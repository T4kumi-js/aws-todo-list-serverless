import Task from '../../domain/task';

interface ITaskRepository {
  create(task: Task): Promise<Task>;

  update(taskId: string | number, task: Task): Promise<Task>;

  remove(taskId: string | number): Promise<void>;

  findAll(): Promise<Task[]>;

  findOneById(taskId: string | number): Promise<Task | null>
}

export default ITaskRepository;
