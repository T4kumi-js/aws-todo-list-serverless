import { Handler, APIGatewayEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import UpdateTaskRequest from '../domain/update-task-request';
import UpdateTaskUseCase from '../use-cases/update-task.use-case';
import DynamoTaskRepository from '../repositories/dynamo-task.repository';
import dynamoClient from '../../database/dynamodb';
import transformBody from '../../../common/helpers/transform-body';
import { jsonResponse } from '../../../common/helpers/response';

const taskRepository = new DynamoTaskRepository({ dynamoClient });
const updateTaskUseCase = new UpdateTaskUseCase({ taskRepository });

export const handler: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const taskId = event.pathParameters?.taskId;

    if (!taskId) {
      return jsonResponse<Error>(new Error('ID not specified'), 400);
    }

    const data = transformBody<UpdateTaskRequest>(event.body);

    const updatedTask = await updateTaskUseCase.execute(taskId, data);

    return jsonResponse(updatedTask);
  } catch (error) {
    return jsonResponse<Error>(error, error.statusCode || 500);
  }
};
