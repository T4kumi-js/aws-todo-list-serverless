import { Handler, APIGatewayEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import FindAllTasksUseCase from '../use-cases/find-all-tasks.use-case';
import DynamoTaskRepository from '../repositories/dynamo-task.repository';
import dynamoClient from '../../database/dynamodb';
import { jsonResponse } from '../../../common/helpers/response';

const taskRepository = new DynamoTaskRepository({ dynamoClient });
const findAllTasksUseCase = new FindAllTasksUseCase({ taskRepository });

export const handler: Handler = async (
  _event: APIGatewayEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const tasks = await findAllTasksUseCase.execute();

    return jsonResponse(tasks);
  } catch (error) {
    return jsonResponse<Error>(error, error.statusCode || 500);
  }
};
