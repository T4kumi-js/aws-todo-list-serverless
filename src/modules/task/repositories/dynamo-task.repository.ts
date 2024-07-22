import ITaskRespository from '../interfaces/repositories/task.repository';
import Task from '../domain/task';
import { v4 as uuidv4 } from 'uuid';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import {
  DynamoDBClient,
  PutItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  GetItemCommand,
  ScanCommand,
  AttributeValue
} from '@aws-sdk/client-dynamodb';

class DynamoTaskRepository implements ITaskRespository {
  private dynamoClient: DynamoDBClient;
  private tableName: string;

  constructor(dependencies: {
    dynamoClient: DynamoDBClient
  }) {
    this.dynamoClient = dependencies.dynamoClient;
    this.tableName = `${process.env.STAGE!}_Tasks`;
  }

  private mapEntityObject(data: Record<string, AttributeValue>): Task {
    const unmarshallData = unmarshall(data);

    return new Task({
      id: unmarshallData.TaskId,
      name: unmarshallData.Name,
      description: unmarshallData.Description,
      isCompleted: (unmarshallData.IsCompleted) ? true : false,
      createdAt: new Date(unmarshallData.CreatedAt),
      updatedAt: new Date(unmarshallData.UpdatedAt)
    });
  }

  async create(task: Task): Promise<Task> {
    const newId = uuidv4();
    const dateOfCreation = new Date();

    await this.dynamoClient.send(new PutItemCommand({
      TableName: this.tableName,
      Item: marshall({
        TaskId: newId,
        Name: task.name,
        Description: task.description,
        IsCompleted: (task.isCompleted) ? 1 : 0,
        CreatedAt: dateOfCreation.toISOString(),
        UpdatedAt: dateOfCreation.toISOString()
      })
    }));

    const createdTask = new Task({
      ...task,
      id: newId,
      createdAt: dateOfCreation,
      updatedAt: dateOfCreation
    });

    return createdTask;
  }

  async update(taskId: string | number, task: Task): Promise<Task> {
    const dateOfUpdate = new Date();

    await this.dynamoClient.send(new UpdateItemCommand({
      TableName: this.tableName,
      Key: marshall({ TaskId: taskId }),
      UpdateExpression: 'SET #NameKey = :NameValue, #DescriptionKey = :DescriptionValue, #IsCompletedKey = :IsCompletedValue, #UpdatedAtKey = :UpdatedAtValue',
      ExpressionAttributeNames: {
        '#NameKey': 'Name',
        '#DescriptionKey': 'Description',
        '#IsCompletedKey': 'IsCompleted',
        '#UpdatedAtKey': 'UpdatedAt'
      },
      ExpressionAttributeValues: marshall({
        ':NameValue': task.name,
        ':DescriptionValue': task.description,
        ':IsCompletedValue': (task.isCompleted) ? 1 : 0,
        ':UpdatedAtValue': dateOfUpdate.toISOString()
      })
    }));

    const updatedTask = new Task({
      ...task,
      updatedAt: dateOfUpdate
    });

    return updatedTask;
  }

  async remove(taskId: string | number): Promise<void> {
    await this.dynamoClient.send(new DeleteItemCommand({
      TableName: this.tableName,
      Key: marshall({ TaskId: taskId })
    }));
  }

  async findAll(): Promise<Task[]> {
    const { Items } = await this.dynamoClient.send(new ScanCommand({
      TableName: this.tableName
    }));

    if (!Items) {
      return [];
    }

    const taskList = Items.map((item) => this.mapEntityObject(item));

    return taskList;
  }

  async findOneById(taskId: string | number): Promise<Task | null> {
    const { Item } = await this.dynamoClient.send(new GetItemCommand({
      TableName: this.tableName,
      Key: marshall({ TaskId: taskId })
    }));

    if (Item) {
      return this.mapEntityObject(Item);
    } else {
      return null;
    }
  }
}

export default DynamoTaskRepository;
