const router = require('express')()
const {login, verifyUser} = require('./login')
router.post('/login', login)


module.exports = router