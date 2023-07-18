const UpdateTaskUseCase = require('../../../application/use-cases/tasks/update-task.use-case');
const DynamoTaskRepository = require('../../repositories/dynamo-task.repository');
const dynamoClient = require('../../dynamodb/client');
const transformBody = require('../helpers/transform-body');
const { jsonResponse } = require('../helpers/response');

const taskRepository = new DynamoTaskRepository({
  dynamoClient,
  tableName: process.env.TASK_TABLE_NAME
});

const updateTaskUseCase = new UpdateTaskUseCase({
  taskRepository
});

const updateTask = async (event) => {
  try {
    const taskId = event.pathParameters.taskId;
    const data = transformBody(event.body);

    const updatedTask = await updateTaskUseCase.execute(taskId, data);

    return jsonResponse(updatedTask);
  } catch (error) {
    return jsonResponse(error, error.statusCode || 500);
  }
};

module.exports.handler = updateTask;
