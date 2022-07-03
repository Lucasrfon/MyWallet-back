import { db } from '../dbStrategy/mongo.js';
import joi from 'joi';

export default async function validateNewUser(req, res, next) {
    const newUserSchema = joi.object({
        name: joi.string().pattern(/^[a-zA-Z0-9]* ?[a-zA-Z0-9]*$/).required(),
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    const user = req.body;
    const validation = newUserSchema.validate(user);

    if(validation.error) {
        return res.status(400).send(validation.error.details);
    }

    if(await db.collection('users').findOne({email: user.email})) {
        return res.status(409).send('Email em uso.');
    }

    next();
}