"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = isAdmin;
/**
 * Checks if the user is an admin based on a custom claim or group in the JWT token.
 * Assumes JWT claims are available in event.requestContext.authorizer.claims.
 */
function isAdmin(event) {
    // Example: Cognito group claim
    const claims = event.requestContext.authorizer?.claims;
    const groups = claims?.['cognito:groups'] || [];
    // Adjust the group name as per your Cognito setup
    return groups.includes('admin');
}
