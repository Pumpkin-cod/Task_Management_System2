"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const uuid_1 = require("uuid");
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const handler = async (event) => {
    try {
        const { title, description, assignedTo, deadline, status } = JSON.parse(event.body || '{}');
        const id = (0, uuid_1.v4)();
        const newTask = {
            id,
            title,
            description,
            assignedTo,
            deadline,
            status: status || 'Pending',
            updatedAt: new Date().toISOString(),
        };
        await dynamoDb.put({
            TableName: process.env.TASKS_TABLE,
            Item: newTask,
        }).promise();
        return {
            statusCode: 201,
            body: JSON.stringify(newTask),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not create task' }),
        };
    }
};
exports.handler = handler;
