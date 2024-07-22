import { Handler, APIGatewayEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import DeleteTaskUseCase from '../use-cases/delete-task.use-case';
import DynamoTaskRepository from '../repositories/dynamo-task.repository';
import dynamoClient from '../../database/dynamodb';
import { jsonResponse } from '../../../common/helpers/response';

const taskRepository = new DynamoTaskRepository({ dynamoClient });
const deleteTaskUseCase = new DeleteTaskUseCase({ taskRepository });

export const handler: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const taskId = event.pathParameters?.taskId;

    if (!taskId) {
      return jsonResponse<Error>(new Error('ID not specified'), 400);
    }

    await deleteTaskUseCase.execute(taskId);

    return jsonResponse({}, 204);
  } catch (error) {
    return jsonResponse<Error>(error, error.statusCode || 500);
  }
};
