import joi from 'joi';
import { db } from '../dbStrategy/mongo.js';

export default async function validateNewUser(req, res, next) {
    const newUserSchema = joi.object({
        name: joi.string().pattern(/^[a-zA-Z]* ?[a-zA-Z]*$/).required(),
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    const user = req.body;
    const validation = newUserSchema.validate(user);

    if(validation.error) {
        return res.status(406).send(validation.error.details[0].message);
    }

    if(await db.collection('users').findOne({email: user.email})) {
        return res.status(409).send('Email já cadastrado.');
    }

    next();
}