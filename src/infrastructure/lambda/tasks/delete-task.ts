import { Handler, APIGatewayEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import DeleteTaskUseCase from '../../../application/use-cases/tasks/delete-task.use-case';
import DynamoTaskRepository from '../../repositories/dynamo-task.repository';
import dynamoClient from '../../dynamodb/client';
import { jsonResponse } from '../helpers/response';

const taskRepository = new DynamoTaskRepository({
  dynamoClient,
  tableName: process.env.TASK_TABLE_NAME!
});

const deleteTaskUseCase = new DeleteTaskUseCase({
  taskRepository
});

const deleteTask: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const taskId = event.pathParameters?.taskId;

    await deleteTaskUseCase.execute(taskId!);

    return jsonResponse({});
  } catch (error) {
    return jsonResponse(error, error.statusCode || 500);
  }
};

export {
  deleteTask as handler
};
