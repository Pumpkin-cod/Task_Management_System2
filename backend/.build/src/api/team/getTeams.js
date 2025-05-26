"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const TABLE_NAME = "Teams"; // ✅ Replace with your actual DynamoDB table name
const handler = async () => {
    try {
        const result = await dynamoDb.scan({
            TableName: TABLE_NAME,
        }).promise();
        return {
            statusCode: 200,
            headers: corsHeaders(),
            body: JSON.stringify({ teams: result.Items }),
        };
    }
    catch (error) {
        console.error("Error fetching teams:", error);
        return {
            statusCode: 500,
            headers: corsHeaders(),
            body: JSON.stringify({ message: "Failed to fetch teams" }),
        };
    }
};
exports.handler = handler;
function corsHeaders() {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
    };
}
