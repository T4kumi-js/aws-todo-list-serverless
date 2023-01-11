const { GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const client = require('../../libs/db');

const getTask = async (event) => {
    const response = { statusCode: 200 };

    try {
        const params = {
            TableName: process.env.TASKS_TABLE_NAME,
            Key: marshall({ TaskId: event.pathParameters.taskId })
        };

        const { Item } = await client.send(new GetItemCommand(params));

        response.headers = {
            'Access-Control-Allow-Origin': process.env.ALLOWED_STATIC_SITE,
            'Access-Control-Allow-Credentials': true,
        };

        response.body = JSON.stringify({
            message: 'Task retrieved successfully',
            data: unmarshall(Item)
        });
    } catch (error) {
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: 'Failed to retrieve the task',
            error
        });
    }

    return response;
};

module.exports.handler = getTask;
