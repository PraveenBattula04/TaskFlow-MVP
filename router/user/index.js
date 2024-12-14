const router = require('express')()
const {createUser} = require('./user')
router.post('/register', createUser)

module.exports = router