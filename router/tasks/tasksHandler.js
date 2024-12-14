const TasksController = require('../../controllers/tasksController/taskController')
const { customResponse } = require('../../lib/custom-response')

async function createTask (req, res, next) {
    try {
        let data = req.body
        let result = await TasksController.createTask(data)
        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            task: result
        })
    } catch (err) {
        customResponse(400, err, res)
    }
}

async function getTasks (req, res, next) {
    try {
        let result = await models.tasks.find()
        customResponse(200, result, res)
    } catch (err) {
        customResponse(400, err, res)
    }
}

async function updateTask (req, res, next) {
    try {
        const data = {...req.body, ...req.params}
        let result = await TasksController.updateTask(data)
        res.status(200).json({
            success: true,
            message: 'Task created successfully',
            task: result
        })
    } catch (err) {
        customResponse(400, err, res)
    }
}

async function deleteTask (req, res, next) {
    try {
        const data = req.params
        let result = await TasksController.deleteTask(data)
        customResponse(200, result, res)
    } catch (err) {
        customResponse(400, err, res)
    }
}

async function filterTasks (req, res, next) {
    try {
        const data = req.params
        let result = await TasksController.filterTasks(data)
        customResponse(200, result, res)
    } catch (err) {
        customResponse(400, err, res)
    }
}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    filterTasks
}
