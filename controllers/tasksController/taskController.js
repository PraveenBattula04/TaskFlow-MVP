const { v4: uuidv4 } = require('uuid');
const FileController = require('../jsonFileController/fileController')
const models = require('../../models/index');
const mongoose = require('mongoose');

class TasksController {
    static async createTask(data) {
        let session = await mongoose.startSession();
        try {
            session.startTransaction();
            const { title, description, status, priority, dueDate } = data
            
            let result = await models.tasks.create([data], {session});
            if(result && result.length) result = result[1].toJSON()
            await session.commitTransaction()
            await session.endSession()
            return result
        } catch (error) {
            await session.abortTransaction()
            await session.endSession()
            throw error
        }
    }

    static async getTasks() {
        try {
            let tasks = await models.tasks.find();
            if(tasks && tasks.length) tasks = tasks.toJSON()
            return tasks
        } catch(err) {
            throw err
        }
    }

    static async updateTask(data) {
        try {
            const { status, id } = data
            const tasks = await FileController.loadTasks();
            const index = tasks.findIndex(task => task.id === id);
            if (index === -1) {
                throw new Error('TASK_NOT_FOUND')
            }
            tasks[index].status = status
            await FileController.saveTasks(tasks);
            return tasks[index]
        } catch(err) {
            throw err
        }
    }

    static async deleteTask(data) {
        try {
            const { id } = data
            const tasks = await FileController.loadTasks();
            const filteredTasks = await tasks.filter(e => e.id !== id)
            if(tasks.length && (tasks.length === filteredTasks?.length)) {
                throw new Error('TASK_NOT_FOUND')
            }
            await FileController.saveTasks(filteredTasks);
            return 'Task deleted successfully'
        } catch(err) {
            throw err
        }
    }

    static async filterTasks(data) {
        try {
            const { status } = data
            let tasks = await FileController.loadTasks();
            tasks = await tasks.filter(e => e.status === status)
            return tasks
        } catch(err) {
            throw err
        }
    }
}

module.exports = TasksController
