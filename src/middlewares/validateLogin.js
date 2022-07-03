import joi from 'joi';
import bcrypt from 'bcrypt';
import { db, ObjectId } from "../dbStrategy/mongo.js";

export default async function validateLogin(req, res, next) {
    const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    const user = req.body;
    const validation = loginSchema.validate(user);
    const validEmail = await db.collection('users').findOne({email: user.email});
    const validPassword = validEmail ? 
    bcrypt.compareSync(user.password, validEmail.password) : null;

    if(validation.error) {
        return res.status(406).send(validation.error.details[0].message);
    }

    if(!validPassword) {
        return res.status(401).send('Senha ou email inválidos.');
    }

    res.locals.validEmail = validEmail;
    next();
}