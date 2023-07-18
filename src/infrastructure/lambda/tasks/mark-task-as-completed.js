const MarkTaskAsCompletedUseCase = require('../../../application/use-cases/tasks/mark-task-as-completed.use-case');
const DynamoTaskRepository = require('../../repositories/dynamo-task.repository');
const dynamoClient = require('../../dynamodb/client');
const { jsonResponse } = require('../helpers/response');

const taskRepository = new DynamoTaskRepository({
  dynamoClient,
  tableName: process.env.TASK_TABLE_NAME
});

const markTaskAsCompletedUseCase = new MarkTaskAsCompletedUseCase({
  taskRepository
});

const markTaskAsCompleted = async (event) => {
  try {
    const taskId = event.pathParameters.taskId;

    const completedTask = await markTaskAsCompletedUseCase.execute(taskId);

    return jsonResponse(completedTask);
  } catch (error) {
    return jsonResponse(error, error.statusCode || 500);
  }
};

module.exports.handler = markTaskAsCompleted;
