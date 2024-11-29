const Joi = require('joi');

const validStatus = ['pending', 'completed']
async function updateTaskValidation (req, res, next) {
    const data = req.params
    let obj = {
        id: Joi.string().required(),
    }
    if(req.method === 'PUT') {
        data['status'] = req.body?.status
        obj['status'] = Joi.string().valid(...validStatus).required()
    }

    // schema object
    const schema = Joi.object(obj);
    

    const {error} = schema.validate(data)
    if (error) {
        res.status(422).json({
            message: error.message
        })
    } else {
        next()
    }
}

async function filterTaskValidation (req, res, next) {
    const data = req.params

    // schema object
    const schema = Joi.object({
        status: Joi.string().valid(...validStatus).required(),
    });
    

    const {error} = schema.validate(data)
    if (error) {
        res.status(422).json({
            message: error.message
        })
    } else {
        next()
    }
}

async function postTaskValidation (req, res, next) {
    const data = req.body

    // schema object
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required()
    });
    

    const {error} = schema.validate(data)
    if (error) {
        res.status(422).json({
            message: error.message
        })
    } else {
        next()
    }
}

module.exports = {
    updateTaskValidation,
    filterTaskValidation,
    postTaskValidation
}
