const LoginController = require('../../controllers/loginController/loginController')
const { customResponse } = require('../../lib/custom-response')
async function login (req, res, next) {
    try {
        const payload = {...req.body}
        const result = await LoginController.login(payload);
        customResponse(201, result, res)
    } catch (err) {
        customResponse(400, err, res)
    }
}

async function verifyUser (req, res, next) {
    try {
        const authHeader = req?.headers?.authorization
        const token = authHeader && authHeader.split(' ')[1]
        await LoginController.verifyUser(token);
        next()
    } catch (err) {
        customResponse(400, err, res)
        next()
    }
}

module.exports = {
    login,
    verifyUser
}