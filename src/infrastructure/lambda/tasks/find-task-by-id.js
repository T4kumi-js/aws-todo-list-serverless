const FindTaskByIdUseCase = require('../../../application/use-cases/tasks/find-task-by-id.use-case');
const DynamoTaskRepository = require('../../repositories/dynamo-task.repository');
const dynamoClient = require('../../dynamodb/client');
const { jsonResponse } = require('../helpers/response');

const taskRepository = new DynamoTaskRepository({
  dynamoClient,
  tableName: process.env.TASK_TABLE_NAME
});

const findTaskByIdUseCase = new FindTaskByIdUseCase({
  taskRepository
});

const findTaskById = async (event) => {
  try {
    const taskId = event.pathParameters.taskId;

    const task = await findTaskByIdUseCase.execute(taskId);

    return jsonResponse(task);
  } catch (error) {
    return jsonResponse(error, error.statusCode || 500);
  }
};

module.exports.handler = findTaskById;
