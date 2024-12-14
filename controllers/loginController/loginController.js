const jwt = require('jsonwebtoken');
const models = require('../../models/index')
class LoginController {
    static async login (data) {
        try {
            const { email, password} = data
            let result = await models.user.findOne({email, password})
            if(result) {
                result = result?.toJSON()
            }
            const secreKey = process.env.JWT_SECRET_TOKEN
            return jwt.sign({result}, secreKey, {expiresIn: '1hr'})
        } catch (err) {
            throw err
        }
    }

    static async verifyUser (token) {
        try {
            if(!token) throw new Error('Token is required')
            const authData = jwt.verify(token, process.env.JWT_SECRET_TOKEN)
            const {email, password} = authData?.result
            const result = await models.user.findOne({
                email, password
            })
            if(!result) throw new Error('Not AUthorized')
        } catch (err) {
            throw err
        }
    }

}

module.exports = LoginController