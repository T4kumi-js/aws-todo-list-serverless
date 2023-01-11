const { DeleteItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');
const client = require('../../libs/db');

const deleteTask = async (event) => {
    const response = { statusCode: 200 };

    try {
        const params = {
            TableName: process.env.TASKS_TABLE_NAME,
            Key: marshall({ TaskId: event.pathParameters.taskId })
        };

        await client.send(new DeleteItemCommand(params));

        response.headers = {
            'Access-Control-Allow-Origin': process.env.ALLOWED_STATIC_SITE,
            'Access-Control-Allow-Credentials': true,
        };

        response.body = JSON.stringify({
            message: 'Task deleted successfully'
        });
    } catch (error) {
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: 'Failed to delete the task',
            error
        });
    }

    return response;
};

module.exports.handler = deleteTask;
