"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const USERS_TABLE = process.env.USERS_TABLE || 'Users';
const handler = async (event) => {
    try {
        const params = {
            TableName: USERS_TABLE,
        };
        const data = await dynamoDb.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ users: data.Items }),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to get users', error: error.message }),
        };
    }
};
exports.handler = handler;
