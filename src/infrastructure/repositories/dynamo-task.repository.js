const Task = require('../../domain/entities/task.entity');
const ITaskRespository = require('../../application/interfaces/repositories/task.repository');
const { v4: uuidv4 } = require('uuid');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const {
  DynamoDBClient,
  PutItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  GetItemCommand,
  ScanCommand
} = require('@aws-sdk/client-dynamodb');

/**
 * @class
 * @implements {ITaskRespository}
 */
class DynamoTaskRepository {
  /**
   * @param {{
   *   dynamoClient: DynamoDBClient,
   *   tableName: string
   * }} dependencies
   */
  constructor({ dynamoClient, tableName }) {
    this.dynamoClient = dynamoClient;
    this.tableName = tableName;
  }

  #mapEntityObject(data) {
    if (!data) {
      return null;
    }

    const unmarshallData = unmarshall(data);

    return new Task({
      id: unmarshallData.TaskId,
      name: unmarshallData.Name,
      description: unmarshallData.Description,
      isCompleted: (unmarshallData.IsCompleted) ? true : false,
      createdAt: unmarshallData.CreatedAt,
      updatedAt: unmarshallData.UpdatedAt
    });
  }

  async create(task) {
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

  async update(taskId, task) {
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

  async remove(taskId) {
    await this.dynamoClient.send(new DeleteItemCommand({
      TableName: this.tableName,
      Key: marshall({ TaskId: taskId })
    }));
  }

  async findAll() {
    const { Items } = await this.dynamoClient.send(new ScanCommand({
      TableName: this.tableName
    }));

    const taskList = Items.map((item) => this.#mapEntityObject(item));

    return taskList;
  }

  async findOneById(taskId) {
    const { Item } = await this.dynamoClient.send(new GetItemCommand({
      TableName: this.tableName,
      Key: marshall({ TaskId: taskId })
    }));

    return this.#mapEntityObject(Item);
  }
}

module.exports = DynamoTaskRepository;
