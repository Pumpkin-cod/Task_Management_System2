"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeam = exports.getTeamById = exports.getTeams = exports.updateTeam = exports.createTeam = void 0;
// controllers/teamController.ts
const teamService = __importStar(require("../services/teamService"));
const uuid_1 = require("uuid");
const createTeam = async (teamData) => {
    const { name, members } = teamData;
    if (!name || !Array.isArray(members)) {
        throw new Error('Team name and members array are required');
    }
    const newTeam = {
        id: (0, uuid_1.v4)(),
        name,
        members,
    };
    await teamService.saveTeam(newTeam);
    return newTeam;
};
exports.createTeam = createTeam;
const updateTeam = async (id, updates) => {
    if (!id)
        throw new Error('Team ID is required');
    // Optional: Validate updates content here if needed
    const updatedTeam = await teamService.updateTeam(id, updates);
    return updatedTeam;
};
exports.updateTeam = updateTeam;
const getTeams = async () => {
    return await teamService.getTeams();
};
exports.getTeams = getTeams;
const getTeamById = async (id) => {
    if (!id)
        throw new Error('Team ID is required');
    return await teamService.getTeamById(id);
};
exports.getTeamById = getTeamById;
// Optional: deleteTeam method if needed
const deleteTeam = async (id) => {
    if (!id)
        throw new Error('Team ID is required');
    await teamService.deleteTeam(id);
    return { message: 'Team deleted successfully' };
};
exports.deleteTeam = deleteTeam;
