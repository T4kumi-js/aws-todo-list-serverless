const FindAllTasksUseCase = require('../../../application/use-cases/tasks/find-all-tasks.use-case');
const DynamoTaskRepository = require('../../repositories/dynamo-task.repository');
const dynamoClient = require('../../dynamodb/client');
const { jsonResponse } = require('../helpers/response');

const taskRepository = new DynamoTaskRepository({
  dynamoClient,
  tableName: process.env.TASK_TABLE_NAME
});

const findAllTasksUseCase = new FindAllTasksUseCase({
  taskRepository
});

const findAllTasks = async (event) => {
  try {
    const tasks = await findAllTasksUseCase.execute();

    return jsonResponse(tasks);
  } catch (error) {
    return jsonResponse(error, error.statusCode || 500);
  }
};

module.exports.handler = findAllTasks;
