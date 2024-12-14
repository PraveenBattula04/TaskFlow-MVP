const { v4: uuidv4 } = require('uuid');
const FileController = require('../jsonFileController/fileController')
const models = require('../../models/index');
const mongoose = require('mongoose');

class TasksController {
    static async createTask(data) {
        let session = await mongoose.startSession();
        try {
            session.startTransaction();            
            let result = await models.tasks.create([data], {session});
            if(result && result.length) result = result[0].toJSON()
            await session.commitTransaction()
            await session.endSession()
            return result
        } catch (error) {
            await session.abortTransaction()
            await session.endSession()
            throw error
        }
    }

    static async sortTasks(data) {
        try {
            let {by, order} = data
            const paylaod = {}
            paylaod[by] = order === 'asc' ? 1 : 2
            let tasks = await models.tasks.find().sort({...paylaod});
            // if(tasks && tasks.length) tasks = tasks.toJSON()
            return tasks
        } catch(err) {
            throw err
        }
    }

    static async updateTask(data) {
        try {
            const { id, ...payload } = data
            let tasks = await models.tasks.findOneAndUpdate({_id: id},
                {$set: payload}, {new: true}
            )
            if (!tasks) {
                throw new Error('TASK_NOT_FOUND')
            } else tasks = tasks.toJSON()
            return tasks
        } catch(err) {
            throw err
        }
    }

    static async deleteTask(data) {
        try {
            const { id } = data
            const tasks = await models.tasks.findOneAndDelete({_id: id})
            if(!tasks) {
                throw new Error('TASK_NOT_FOUND')
            }
            return 'Task deleted successfully'
        } catch(err) {
            throw err
        }
    }

    static async filterTasks(data) {
        try {
            const {dueDateStart, dueDateEnd, ...payload} = {...data}
            let tasks = await models.tasks.find({...payload, dueDate: {
                $gte: dueDateStart,
                $lte: dueDateEnd
            }})
            if(tasks && tasks.length) tasks = tasks[0].toJSON()
            return tasks
        } catch(err) {
            throw err
        }
    }
}

module.exports = TasksController
