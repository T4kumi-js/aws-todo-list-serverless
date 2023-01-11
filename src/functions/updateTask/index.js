const { UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');
const client = require('../../libs/db');

const updateTask = async (event) => {
    const response = { statusCode: 200 };

    try {
        const data = (typeof event.body === 'string')
            ? JSON.parse(event.body)
            : event.body;

        const params = {
            TableName: process.env.TASKS_TABLE_NAME,
            Key: marshall({ TaskId: event.pathParameters.taskId }),
            UpdateExpression: 'SET #NameKey = :NameValue, #DescriptionKey = :DescriptionValue',
            ExpressionAttributeNames: {
                '#NameKey': 'Name',
                '#DescriptionKey': 'Description'
            },
            ExpressionAttributeValues: marshall({
                ':NameValue': data.name,
                ':DescriptionValue': data.description
            })
        };

        await client.send(new UpdateItemCommand(params));

        response.headers = {
            'Access-Control-Allow-Origin': process.env.ALLOWED_STATIC_SITE,
            'Access-Control-Allow-Credentials': true,
        };

        response.body = JSON.stringify({
            message: 'Task updated successfully'
        });
    } catch (error) {
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: 'Failed to update the task',
            error
        });
    }

    return response;
};

module.exports.handler = updateTask;
