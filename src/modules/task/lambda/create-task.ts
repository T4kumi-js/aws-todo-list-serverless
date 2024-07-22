import { Handler, APIGatewayEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import CreateTaskRequest from '../domain/create-task-request';
import CreateTaskUseCase from '../use-cases/create-task.use-case';
import DynamoTaskRepository from '../repositories/dynamo-task.repository';
import dynamoClient from '../../database/dynamodb';
import transformBody from '../../../common/helpers/transform-body';
import { jsonResponse } from '../../../common/helpers/response';

const taskRepository = new DynamoTaskRepository({ dynamoClient });
const createTaskUseCase = new CreateTaskUseCase({ taskRepository });

export const handler: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const data = transformBody<CreateTaskRequest>(event.body);

    const createdTask = await createTaskUseCase.execute(data);

    return jsonResponse(createdTask);
  } catch (error) {
    return jsonResponse<Error>(error, error.statusCode || 500);
  }
};
