"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const uuid_1 = require("uuid");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const TABLE_NAME = "Teams"; // ✅ Replace with your actual DynamoDB table name
const handler = async (event) => {
    try {
        const body = JSON.parse(event.body || "{}");
        const { name, description, members } = body;
        if (!name || !Array.isArray(members)) {
            return {
                statusCode: 400,
                headers: corsHeaders(),
                body: JSON.stringify({ message: "Invalid input" }),
            };
        }
        const newTeam = {
            id: (0, uuid_1.v4)(),
            name,
            description,
            members,
            createdAt: new Date().toISOString(),
        };
        await dynamoDb
            .put({
            TableName: TABLE_NAME,
            Item: newTeam,
        })
            .promise();
        return {
            statusCode: 201,
            headers: corsHeaders(),
            body: JSON.stringify({ message: "Team created", team: newTeam }),
        };
    }
    catch (error) {
        console.error("Error creating team:", error);
        return {
            statusCode: 500,
            headers: corsHeaders(),
            body: JSON.stringify({ message: "Failed to create team" }),
        };
    }
};
exports.handler = handler;
function corsHeaders() {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST",
    };
}
