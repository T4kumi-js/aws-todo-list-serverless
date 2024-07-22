import { Handler, APIGatewayEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import FindTaskByIdUseCase from '../../../application/use-cases/tasks/find-task-by-id.use-case';
import DynamoTaskRepository from '../../repositories/dynamo-task.repository';
import dynamoClient from '../../dynamodb/client';
import { jsonResponse } from '../helpers/response';

const taskRepository = new DynamoTaskRepository({
  dynamoClient,
  tableName: process.env.TASK_TABLE_NAME!
});

const findTaskByIdUseCase = new FindTaskByIdUseCase({
  taskRepository
});

const findTaskById: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const taskId = event.pathParameters?.taskId;

    const task = await findTaskByIdUseCase.execute(taskId!);

    return jsonResponse(task);
  } catch (error) {
    return jsonResponse(error, error.statusCode || 500);
  }
};

export {
  findTaskById as handler
};
