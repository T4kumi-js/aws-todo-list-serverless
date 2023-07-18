const DeleteTaskUseCase = require('../../../application/use-cases/tasks/delete-task.use-case');
const DynamoTaskRepository = require('../../repositories/dynamo-task.repository');
const dynamoClient = require('../../dynamodb/client');
const { jsonResponse } = require('../helpers/response');

const taskRepository = new DynamoTaskRepository({
  dynamoClient,
  tableName: process.env.TASK_TABLE_NAME
});

const deleteTaskUseCase = new DeleteTaskUseCase({
  taskRepository
});

const deleteTask = async (event) => {
  try {
    const taskId = event.pathParameters.taskId;

    await deleteTaskUseCase.execute(taskId);

    return jsonResponse({});
  } catch (error) {
    return jsonResponse(error, error.statusCode || 500);
  }
};

module.exports.handler = deleteTask;
