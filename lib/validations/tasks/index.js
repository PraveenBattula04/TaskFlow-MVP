const Joi = require('joi');

const validStatus = ['pending', 'completed']
const priority = ['low', 'medium', 'high']
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
        status: Joi.string().valid(...validStatus),
        priority: Joi.string().valid(...priority),
        dueDateStart: Joi.date(),
        dueDateEnd: Joi.date()
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
        description: Joi.string().required(),
        status: Joi.string(),
        priority: Joi.string(),
        dueDate: Joi.date().required()
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
