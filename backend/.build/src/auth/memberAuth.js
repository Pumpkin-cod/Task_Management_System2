"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMember = isMember;
/**
 * Checks if the user is a team member based on a custom claim or group in the JWT token.
 * Assumes JWT claims are available in event.requestContext.authorizer.claims.
 */
function isMember(event) {
    // Example: Cognito group claim
    const claims = event.requestContext.authorizer?.claims;
    const groups = claims?.['cognito:groups'] || [];
    // Adjust the group name as per your Cognito setup
    return groups.includes('member');
}
