"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeam = exports.updateTeam = exports.getTeamById = exports.getTeams = exports.saveTeam = void 0;
// services/teamService.ts
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TEAMS_TABLE;
// Save a new team
const saveTeam = async (team) => {
    await dynamoDb.put({
        TableName: TABLE_NAME,
        Item: team,
    }).promise();
};
exports.saveTeam = saveTeam;
// Get all teams
const getTeams = async () => {
    const result = await dynamoDb.scan({ TableName: TABLE_NAME }).promise();
    return result.Items || [];
};
exports.getTeams = getTeams;
// Get team by ID
const getTeamById = async (id) => {
    const result = await dynamoDb.get({
        TableName: TABLE_NAME,
        Key: { id },
    }).promise();
    return result.Item;
};
exports.getTeamById = getTeamById;
// Update team name and/or members
const updateTeam = async (id, updates) => {
    const updateExpressions = [];
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};
    if (updates.name) {
        updateExpressions.push('#name = :name');
        expressionAttributeNames['#name'] = 'name';
        expressionAttributeValues[':name'] = updates.name;
    }
    if (updates.members) {
        updateExpressions.push('#members = :members');
        expressionAttributeNames['#members'] = 'members';
        expressionAttributeValues[':members'] = updates.members;
    }
    if (updateExpressions.length === 0) {
        throw new Error('No valid fields provided for update');
    }
    const params = {
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: 'SET ' + updateExpressions.join(', '),
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
    };
    const result = await dynamoDb.update(params).promise();
    return result.Attributes;
};
exports.updateTeam = updateTeam;
// Delete a team
const deleteTeam = async (id) => {
    await dynamoDb.delete({
        TableName: TABLE_NAME,
        Key: { id },
    }).promise();
};
exports.deleteTeam = deleteTeam;
