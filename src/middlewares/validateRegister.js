import joi from 'joi';

export default async function validateRegister(req, res, next) {
    const registerSchema = joi.object({
        value: joi.number().precision(2).required(),
        description: joi.string().required(),
        type: joi.string().valid('saída', 'entrada').required()
    });
    const register = req.body;
    const validation = registerSchema.validate(register);

    if(validation.error) {
        return res.status(400).send(validation.error.details);
    }

    next();
}