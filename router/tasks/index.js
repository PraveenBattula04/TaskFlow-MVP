const router = require('express').Router()
const tasksHandler = require('./tasksHandler')
const { updateTaskValidation, postTaskValidation, filterTaskValidation } = require('../../lib/validations/tasks')
router.get('/', tasksHandler.getTasks)
router.post('/', postTaskValidation, tasksHandler.createTask)
router.put('/:id', updateTaskValidation, tasksHandler.updateTask)
router.delete('/:id', updateTaskValidation, tasksHandler.deleteTask)
router.get('/status/:status',filterTaskValidation, tasksHandler.filterTasks)

module.exports = router
