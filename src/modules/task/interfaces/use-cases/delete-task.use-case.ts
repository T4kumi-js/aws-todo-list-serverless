interface IDeleteTaskUseCase {
  execute(taskId: string | number): Promise<void>;
}

export default IDeleteTaskUseCase;
