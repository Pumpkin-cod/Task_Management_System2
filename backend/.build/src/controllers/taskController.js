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
exports.assignTask = exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const taskService = __importStar(require("../services/taskService"));
const uuid_1 = require("uuid");
// Create a new task
const createTask = async (taskData) => {
    const { title, description, assignedTo, deadline, status } = taskData;
    if (!title || !assignedTo || !deadline) {
        throw new Error('Title, assignedTo, and deadline are required');
    }
    const newTask = {
        id: (0, uuid_1.v4)(),
        title,
        description,
        assignedTo,
        deadline,
        status: status || 'Pending',
        updatedAt: new Date().toISOString(),
    };
    await taskService.saveTask(newTask);
    return newTask;
};
exports.createTask = createTask;
// Get all tasks (optionally filtered in service)
const getTasks = async (assignedTo) => {
    return await taskService.getTasks();
};
exports.getTasks = getTasks;
// Update task fields (e.g. title, status, etc.)
const updateTask = async (id, updates) => {
    if (!id)
        throw new Error('Task ID is required');
    return await taskService.updateTask(id, updates);
};
exports.updateTask = updateTask;
// Delete a task by ID
const deleteTask = async (id) => {
    if (!id)
        throw new Error('Task ID is required');
    await taskService.deleteTask(id);
    return { message: 'Task deleted successfully' };
};
exports.deleteTask = deleteTask;
// Reassign task to a different user
const assignTask = async (taskData) => {
    const { id, assignedTo } = taskData;
    if (!id || !assignedTo) {
        throw new Error('Task ID and assignedTo are required');
    }
    return await taskService.updateAssignedTo(id, assignedTo);
};
exports.assignTask = assignTask;
