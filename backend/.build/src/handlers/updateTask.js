"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const handler = async (event) => {
    try {
        const { id, title, description, assignedTo, deadline, status } = JSON.parse(event.body || '{}');
        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Task ID is required' }),
            };
        }
        const params = {
            TableName: process.env.TASKS_TABLE,
            Key: { id },
            UpdateExpression: 'set #title = :title, #description = :description, #assignedTo = :assignedTo, #deadline = :deadline, #status = :status, #updatedAt = :updatedAt',
            ExpressionAttributeNames: {
                '#title': 'title',
                '#description': 'description',
                '#assignedTo': 'assignedTo',
                '#deadline': 'deadline',
                '#status': 'status',
                '#updatedAt': 'updatedAt',
            },
            ExpressionAttributeValues: {
                ':title': title,
                ':description': description,
                ':assignedTo': assignedTo,
                ':deadline': deadline,
                ':status': status,
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
            body: JSON.stringify({ error: 'Could not update task' }),
        };
    }
};
exports.handler = handler;
