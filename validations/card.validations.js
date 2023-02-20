const Joi = require("joi");

const validateNewCard = card => {
    const schema = Joi.object({
        bizName: Joi.string().min(2).max(255).required(),
        bizPhone: Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/),
        bizAddress: Joi.string().min(2).max(1024).required(),
        bizDescription: Joi.string().min(2).max(1024).required(),
        bizImage: Joi.string().allow('').min(11).max(1024).uri()
    })

    return schema.validate(card);
}

module.exports = {
    validateNewCard
}