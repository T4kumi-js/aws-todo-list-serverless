import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

const dynamoConfig: DynamoDBClientConfig = {};

if (process.env.IS_OFFLINE) {
  dynamoConfig.endpoint = 'http://localhost:8000';
}

const client = new DynamoDBClient(dynamoConfig);

export default client;
