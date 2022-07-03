import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { db, ObjectId } from "../dbStrategy/mongo.js";

export async function creatUser(req, res) {
    try {
        const user = req.body;
        const encryptedPassword = bcrypt.hashSync(user.password, 5);

        await db.collection('users').insertOne({...user, password: encryptedPassword});
        res.status(201).send('Cadastro realizado com sucesso!');
        
    } catch(error) {
        res.send('Algo de errado não está certo.');
    }
}

export async function loginUser(req, res) {
    try {
        const user = req.body;
        const token = uuid();
        const validEmail = res.locals.validEmail
            
        await db.collection('sessions').insertOne({token, userId: new ObjectId(validEmail._id), generated: Date.now()});
        return res.status(201).send({ token });

    } catch(error) {
        res.send('Algo de errado não está certo.');
    }
}