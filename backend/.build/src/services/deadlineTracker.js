"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOverdueTasks = getOverdueTasks;
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
/**
 * Finds tasks that are overdue (deadline before today and not completed).
 */
async function getOverdueTasks(tableName) {
    const today = new Date().toISOString().split('T')[0];
    const params = {
        TableName: tableName,
        FilterExpression: '#deadline < :today AND #status <> :completed',
        ExpressionAttributeNames: {
            '#deadline': 'deadline',
            '#status': 'status',
        },
        ExpressionAttributeValues: {
            ':today': today,
            ':completed': 'Completed',
        },
    };
    const data = await dynamoDb.scan(params).promise();
    return data.Items || [];
}
