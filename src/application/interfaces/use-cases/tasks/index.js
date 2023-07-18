const ICreateTaskUseCase = require('./create-task.use-case');
const IUpdateTaskUseCase = require('./update-task.use-case');
const IDeleteTaskUseCase = require('./delete-task.use-case');
const IMarkTaskAsCompletedUseCase = require('./mark-task-as-completed.use-case');
const IFindAllTasksUseCase = require('./find-all-tasks.use-case');
const IFindTaskByIdUseCase = require('./find-task-by-id.use-case');

module.exports = {
  ICreateTaskUseCase,
  IUpdateTaskUseCase,
  IDeleteTaskUseCase,
  IMarkTaskAsCompletedUseCase,
  IFindAllTasksUseCase,
  IFindTaskByIdUseCase
};
