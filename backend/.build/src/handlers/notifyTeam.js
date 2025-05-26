"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const sns = new aws_sdk_1.SNS();
const topicArn = process.env.NOTIFICATION_TOPIC_ARN;
if (!topicArn) {
    throw new Error('NOTIFICATION_TOPIC_ARN environment variable is not set');
}
const handler = async (event) => {
    try {
        const { message, subject, topicArn } = JSON.parse(event.body || '{}');
        if (!message || !topicArn) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Message and topicArn are required' }),
            };
        }
        await sns
            .publish({
            Message: message,
            Subject: subject || 'Task Notification',
            TopicArn: topicArn,
        })
            .promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Notification sent successfully' }),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not send notification' }),
        };
    }
};
exports.handler = handler;
