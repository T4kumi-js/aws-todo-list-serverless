const { PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');
const { v4: uuidv4 } = require('uuid');
const client = require('../../libs/db');

const createTask = async (event) => {
    const response = { statusCode: 200 };

    try {
        const data = (typeof event.body === 'string')
            ? JSON.parse(event.body)
            : event.body;

        const params = {
            TableName: process.env.TASKS_TABLE_NAME,
            Item: marshall({
                TaskId: uuidv4(),
                Name: data.name,
                Description: data.description,
                Completed: 0
            })
        };

        await client.send(new PutItemCommand(params));

        response.headers = {
            'Access-Control-Allow-Origin': process.env.ALLOWED_STATIC_SITE,
            'Access-Control-Allow-Credentials': true,
        };

        response.body = JSON.stringify({
            message: 'Task created successfully'
        });
    } catch (error) {
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: 'Failed to create the task',
            error
        });
    }

    return response;
};

module.exports.handler = createTask;
