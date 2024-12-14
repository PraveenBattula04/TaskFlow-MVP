const router = require('express').Router()
const tasksHandler = require('./tasksHandler')
const { updateTaskValidation, postTaskValidation, filterTaskValidation } = require('../../lib/validations/tasks')

router.post('/', postTaskValidation, tasksHandler.createTask)
router.put('/:id', updateTaskValidation, tasksHandler.updateTask)
router.delete('/:id', updateTaskValidation, tasksHandler.deleteTask)
router.get('/',filterTaskValidation, tasksHandler.filterTasks)
router.get('/sort', tasksHandler.getTasks)

module.exports = router
