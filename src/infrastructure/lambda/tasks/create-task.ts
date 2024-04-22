import { Handler, APIGatewayEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import CreateTaskUseCase from '../../../application/use-cases/tasks/create-task.use-case';
import DynamoTaskRepository from '../../repositories/dynamo-task.repository';
import dynamoClient from '../../dynamodb/client';
import transformBody from '../helpers/transform-body';
import { jsonResponse } from '../helpers/response';

const taskRepository = new DynamoTaskRepository({
  dynamoClient,
  tableName: process.env.TASK_TABLE_NAME!
});

const createTaskUseCase = new CreateTaskUseCase({
  taskRepository
});

const createTask: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const data = transformBody(event.body);

    const createdTask = await createTaskUseCase.execute(data);

    return jsonResponse(createdTask);
  } catch (error) {
    return jsonResponse<Error>(error, error.statusCode || 500);
  }
};

export {
  createTask as handler
};
