const errorCodesJson = require('../error-codes.json')

function customResponse (statusCode, data, res) {
    if ([200, 201, 301, 206].indexOf(statusCode) > -1) {
        res.statusCode = statusCode
        res.send({
            success: true,
            data: data
        })
    } else {
        data = errorCodesJson[data?.message] || data
        res.statusCode = data?.statusCode || statusCode
        res.send({
            success: false,
            message: data.message || data
        })
    }
}

module.exports = {
    customResponse
}
