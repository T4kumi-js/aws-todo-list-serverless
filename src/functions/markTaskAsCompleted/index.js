const { UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');
const client = require('../../libs/db');

const updateTask = async (event) => {
    const response = { statusCode: 200 };

    try {
        const params = {
            TableName: process.env.TASKS_TABLE_NAME,
            Key: marshall({ TaskId: event.pathParameters.taskId }),
            UpdateExpression: 'SET #CompletedKey = :CompletedValue',
            ExpressionAttributeNames: {
                '#CompletedKey': 'Completed'
            },
            ExpressionAttributeValues: marshall({
                ':CompletedValue': 1
            })
        };

        await client.send(new UpdateItemCommand(params));

        response.headers = {
            'Access-Control-Allow-Origin': process.env.ALLOWED_STATIC_SITE,
            'Access-Control-Allow-Credentials': true,
        };

        response.body = JSON.stringify({
            message: 'Task completed successfully'
        });
    } catch (error) {
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: 'Failed to complete the task',
            error
        });
    }

    return response;
};

module.exports.handler = updateTask;
