const CreateTaskUseCase = require('./create-task.use-case');
const UpdateTaskUseCase = require('./update-task.use-case');
const DeleteTaskUseCase = require('./delete-task.use-case');
const MarkTaskAsCompletedUseCase = require('./mark-task-as-completed.use-case');
const FindAllTasksUseCase = require('./find-all-tasks.use-case');
const FindTaskByIdUseCase = require('./find-task-by-id.use-case');

module.exports = {
  CreateTaskUseCase,
  UpdateTaskUseCase,
  DeleteTaskUseCase,
  MarkTaskAsCompletedUseCase,
  FindAllTasksUseCase,
  FindTaskByIdUseCase
};
