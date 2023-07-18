const CreateTaskUseCase = require('../../../application/use-cases/tasks/create-task.use-case');
const DynamoTaskRepository = require('../../repositories/dynamo-task.repository');
const dynamoClient = require('../../dynamodb/client');
const transformBody = require('../helpers/transform-body');
const { jsonResponse } = require('../helpers/response');

const taskRepository = new DynamoTaskRepository({
  dynamoClient,
  tableName: process.env.TASK_TABLE_NAME
});

const createTaskUseCase = new CreateTaskUseCase({
  taskRepository
});

const createTask = async (event) => {
  try {
    const data = transformBody(event.body);

    const createdTask = await createTaskUseCase.execute(data);

    return jsonResponse(createdTask);
  } catch (error) {
    return jsonResponse(error, error.statusCode || 500);
  }
};

module.exports.handler = createTask;
