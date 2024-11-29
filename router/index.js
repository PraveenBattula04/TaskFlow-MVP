const router = require('express').Router();
const tasksHandler = require('./tasks/index')

router.use('/tasks', tasksHandler)
module.exports = router