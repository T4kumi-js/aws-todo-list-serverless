import { Handler, APIGatewayEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import UpdateTaskUseCase from '../../../application/use-cases/tasks/update-task.use-case';
import DynamoTaskRepository from '../../repositories/dynamo-task.repository';
import dynamoClient from '../../dynamodb/client';
import transformBody from '../helpers/transform-body';
import { jsonResponse } from '../helpers/response';

const taskRepository = new DynamoTaskRepository({
  dynamoClient,
  tableName: process.env.TASK_TABLE_NAME!
});

const updateTaskUseCase = new UpdateTaskUseCase({
  taskRepository
});

const updateTask: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const taskId = event.pathParameters?.taskId;
    const data = transformBody(event.body);

    const updatedTask = await updateTaskUseCase.execute(taskId!, data);

    return jsonResponse(updatedTask);
  } catch (error) {
    return jsonResponse(error, error.statusCode || 500);
  }
};

export {
  updateTask as handler
};
