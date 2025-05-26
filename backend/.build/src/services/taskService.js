"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAssignedTo = exports.getTaskById = exports.saveTask = exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
// services/taskService.ts
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const TASKS_TABLE = process.env.TASKS_TABLE;
const createTask = async (task) => {
    const params = {
        TableName: TASKS_TABLE,
        Item: task,
    };
    await dynamoDb.put(params).promise();
    return task;
};
exports.createTask = createTask;
const getTasks = async () => {
    const params = { TableName: TASKS_TABLE };
    const result = await dynamoDb.scan(params).promise();
    return result.Items;
};
exports.getTasks = getTasks;
const updateTask = async (id, updates) => {
    const updateExp = [];
    const expAttrNames = {};
    const expAttrValues = {};
    Object.entries(updates).forEach(([key, value], i) => {
        const attrName = `#attr${i}`;
        const attrValue = `:val${i}`;
        updateExp.push(`${attrName} = ${attrValue}`);
        expAttrNames[attrName] = key;
        expAttrValues[attrValue] = value;
    });
    const params = {
        TableName: TASKS_TABLE,
        Key: { id },
        UpdateExpression: `set ${updateExp.join(', ')}, updatedAt = :updatedAt`,
        ExpressionAttributeNames: expAttrNames,
        ExpressionAttributeValues: {
            ...expAttrValues,
            ':updatedAt': new Date().toISOString(),
        },
        ReturnValues: 'ALL_NEW',
    };
    const result = await dynamoDb.update(params).promise();
    return result.Attributes;
};
exports.updateTask = updateTask;
const deleteTask = async (id) => {
    const params = {
        TableName: TASKS_TABLE,
        Key: { id },
    };
    await dynamoDb.delete(params).promise();
};
exports.deleteTask = deleteTask;
const saveTask = async (task) => {
    await dynamoDb.put({
        TableName: process.env.TASKS_TABLE,
        Item: task,
    }).promise();
};
exports.saveTask = saveTask;
const getTaskById = async (id) => {
    const params = {
        TableName: TASKS_TABLE,
        Key: { id },
    };
    const result = await dynamoDb.get(params).promise();
    return result.Item;
};
exports.getTaskById = getTaskById;
const updateAssignedTo = async (id, assignedTo) => {
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
    return result.Attributes;
};
exports.updateAssignedTo = updateAssignedTo;
