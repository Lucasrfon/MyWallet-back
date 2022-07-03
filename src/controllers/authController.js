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
        const validEmail = await db.collection('users').findOne({email: user.email});
        const validPassword = validEmail ? 
        bcrypt.compareSync(user.password, validEmail.password) : null;

        if(validPassword) {
            const token = uuid();
            
            await db.collection('sessions').insertOne({token, userId: new ObjectId(validEmail._id), generated: Date.now()});
            return res.status(201).send({ token });
        } else {
            return res.status(401).send('Senha ou email inválidos.');
        }
    } catch(error) {
        res.send('Algo de errado não está certo.');
    }
}