import joi from 'joi';

export default async function validateLogin(req, res, next) {
    const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    const user = req.body;
    const validation = loginSchema.validate(user);

    if(validation.error) {
        return res.status(400).send(validation.error.details);
    }

    next();
}