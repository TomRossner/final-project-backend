const Joi = require("joi");

const validateNewUser = user => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        email: Joi.string().email().min(6).max(255).required(),
        password: Joi.string().min(6).max(1024).required(),
        isBiz: Joi.boolean()
    })

    return schema.validate(user);
}

const validateUserLogin = credentials => {
    const schema = Joi.object({
        email: Joi.string().email().min(6).max(255).required(),
        password: Joi.string().min(6).max(1024).required()
    })

    return schema.validate(credentials);
}

module.exports = {
    validateNewUser,
    validateUserLogin
}