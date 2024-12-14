const UserController = require('../../controllers/userController/userController')
const { customResponse } = require('../../lib/custom-response')
async function createUser (req, res, next) {
    try {
        const payload = {...req.body}
        const result = await UserController.createUser(payload);
        customResponse(201, result, res)
    } catch (err) {
        customResponse(400, err, res)
    }
}

module.exports = {
    createUser
}