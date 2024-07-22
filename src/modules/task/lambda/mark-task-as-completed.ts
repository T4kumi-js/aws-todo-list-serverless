import { Handler, APIGatewayEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import MarkTaskAsCompletedUseCase from '../../../application/use-cases/tasks/mark-task-as-completed.use-case';
import DynamoTaskRepository from '../../repositories/dynamo-task.repository';
import dynamoClient from '../../dynamodb/client';
import { jsonResponse } from '../helpers/response';

const taskRepository = new DynamoTaskRepository({
  dynamoClient,
  tableName: process.env.TASK_TABLE_NAME!
});

const markTaskAsCompletedUseCase = new MarkTaskAsCompletedUseCase({
  taskRepository
});

const markTaskAsCompleted: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const taskId = event.pathParameters?.taskId;

    const completedTask = await markTaskAsCompletedUseCase.execute(taskId!);

    return jsonResponse(completedTask);
  } catch (error) {
    return jsonResponse(error, error.statusCode || 500);
  }
};

export {
  markTaskAsCompleted as handler
};
