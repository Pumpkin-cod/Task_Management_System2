"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const handler = async (event) => {
    try {
        const { id, assignedTo } = JSON.parse(event.body || '{}');
        if (!id || !assignedTo) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Task ID and assignedTo are required' }),
            };
        }
        const params = {
            TableName: process.env.TASKS_TABLE,
            Key: { id },
            UpdateExpression: 'set #assignedTo = :assignedTo, #updatedAt = :updatedAt',
            ExpressionAttributeNames: {
                '#assignedTo': 'assignedTo',
                '#updatedAt': 'updatedAt',
            },
            ExpressionAttributeValues: {
                ':assignedTo': assignedTo,
                ':updatedAt': new Date().toISOString(),
            },
            ReturnValues: 'ALL_NEW',
        };
        const result = await dynamoDb.update(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(result.Attributes),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not assign task' }),
        };
    }
};
exports.handler = handler;
