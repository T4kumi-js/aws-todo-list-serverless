interface IDeleteTaskUseCase {
  execute(taskId: string): Promise<void>
}

export default IDeleteTaskUseCase;
