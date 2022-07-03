import joi from 'joi';
import { db, ObjectId } from '../dbStrategy/mongo.js';

export default async function validateNewUser(req, res, next) {
    const register = req.body;
    const validation = joi.object({ _id: joi.string().required() }).validate(register);

    if(validation.error) {
        return res.status(400).send(validation.error.details);
    }

    if(await db.collection('registers').findOne({ _id: new ObjectId(register._id)})) {
        next();
    } else {
        return res.status(404).send();
    }
}