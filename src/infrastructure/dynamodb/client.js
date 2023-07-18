const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

const client = new DynamoDBClient({
  endpoint: 'http://localhost:8000' // remove this when deploying to AWS
});

module.exports = client;
