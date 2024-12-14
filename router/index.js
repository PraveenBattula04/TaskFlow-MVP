const router = require('express').Router();
const tasksHandler = require('./tasks/index')
const userHandler = require('./user/index')
const loginHandler = require('./login/index')
const {verifyUser} = require('./login/login')

router.use('/', loginHandler)

router.use(verifyUser)

router.use('/', userHandler)
router.use('/tasks', tasksHandler)
module.exports = router