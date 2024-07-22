import { Handler, APIGatewayEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import MarkTaskAsCompletedUseCase from '../use-cases/mark-task-as-completed.use-case';
import DynamoTaskRepository from '../repositories/dynamo-task.repository';
import dynamoClient from '../../database/dynamodb';
import { jsonResponse } from '../../../common/helpers/response';

const taskRepository = new DynamoTaskRepository({ dynamoClient });
const markTaskAsCompletedUseCase = new MarkTaskAsCompletedUseCase({ taskRepository });

export const handler: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const taskId = event.pathParameters?.taskId;

    if (!taskId) {
      return jsonResponse<Error>(new Error('ID not specified'), 400);
    }

    const completedTask = await markTaskAsCompletedUseCase.execute(taskId);

    return jsonResponse(completedTask);
  } catch (error) {
    return jsonResponse<Error>(error, error.statusCode || 500);
  }
};
