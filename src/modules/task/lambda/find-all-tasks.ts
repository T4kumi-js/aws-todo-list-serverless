import { Handler, APIGatewayEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import FindAllTasksUseCase from '../../../application/use-cases/tasks/find-all-tasks.use-case';
import DynamoTaskRepository from '../../repositories/dynamo-task.repository';
import dynamoClient from '../../dynamodb/client';
import { jsonResponse } from '../helpers/response';

const taskRepository = new DynamoTaskRepository({
  dynamoClient,
  tableName: process.env.TASK_TABLE_NAME!
});

const findAllTasksUseCase = new FindAllTasksUseCase({
  taskRepository
});

const findAllTasks: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    const tasks = await findAllTasksUseCase.execute();

    return jsonResponse(tasks);
  } catch (error) {
    return jsonResponse(error, error.statusCode || 500);
  }
};

export {
  findAllTasks as handler
};
