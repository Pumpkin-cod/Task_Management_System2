"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const handler = async (event) => {
    try {
        // Optionally filter by assignedTo (for team members)
        const assignedTo = event.queryStringParameters?.assignedTo;
        const params = {
            TableName: process.env.TASKS_TABLE,
        };
        const data = await dynamoDb.scan(params).promise();
        let tasks = data.Items || [];
        // If assignedTo is provided, filter tasks
        if (assignedTo) {
            tasks = tasks.filter((task) => task.assignedTo === assignedTo);
        }
        return {
            statusCode: 200,
            body: JSON.stringify(tasks),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not fetch tasks' }),
        };
    }
};
exports.handler = handler;
