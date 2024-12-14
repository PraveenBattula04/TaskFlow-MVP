const mongoose = require("mongoose")
const user = require('../../models/user')

class UserController {
    static async createUser (data) {
        const tr = await mongoose.startSession()
        try {
            tr.startTransaction()
            const { email, password} = data
            await use.findOne({data})
            const result = await user.create([data], {tr});
            tr.commitTransaction();
            tr.endSession()
            return result
        } catch (err) {
            tr.abortTransaction()
            tr.endSession()
            throw err
        }
    }
}

module.exports = UserController