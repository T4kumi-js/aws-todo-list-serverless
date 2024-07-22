import { Handler, APIGatewayEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import FindTaskByIdUseCase from '../use-cases/find-task-by-id.use-case';
import DynamoTaskRepository from '../repositories/dynamo-task.repository';
import dynamoClient from '../../database/dynamodb';
import { jsonResponse } from '../../../common/helpers/response';

const taskRepository = new DynamoTaskRepository({ dynamoClient });
const findTaskByIdUseCase = new FindTaskByIdUseCase({ taskRepository });

export const handler: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const taskId = event.pathParameters?.taskId;

    if (!taskId) {
      return jsonResponse<Error>(new Error('ID not specified'), 400);
    }

    const task = await findTaskByIdUseCase.execute(taskId);

    return jsonResponse(task);
  } catch (error) {
    return jsonResponse<Error>(error, error.statusCode || 500);
  }
};
