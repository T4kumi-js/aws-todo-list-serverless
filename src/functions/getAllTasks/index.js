const { ScanCommand } = require('@aws-sdk/client-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');
const client = require('../../libs/db');

const getAllTasks = async (event) => {
    const response = { statusCode: 200 };

    try {
        const { Items } = await client.send(new ScanCommand({
            TableName: process.env.TASKS_TABLE_NAME
        }));

        response.headers = {
            'Access-Control-Allow-Origin': process.env.ALLOWED_STATIC_SITE,
            'Access-Control-Allow-Credentials': true,
        };

        response.body = JSON.stringify({
            message: 'Tasks retrieved successfully',
            data: Items.map((item) => unmarshall(item))
        });
    } catch (error) {
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: 'Failed to retrieve all the tasks',
            error
        });
    }

    return response;
};

module.exports.handler = getAllTasks;
