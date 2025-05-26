"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = sendNotification;
const aws_sdk_1 = require("aws-sdk");
/**
 * Sends a notification to an SNS topic.
 * @param topicArn - The ARN of the SNS topic.
 * @param message - The message to send.
 * @param subject - The subject of the notification (optional).
 */
async function sendNotification(topicArn, message, subject) {
    const sns = new aws_sdk_1.SNS();
    await sns
        .publish({
        TopicArn: topicArn,
        Message: message,
        Subject: subject || 'Task Notification',
    })
        .promise();
}
