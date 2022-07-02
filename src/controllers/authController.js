import bcrypt from 'bcrypt';
import { db } from "../dbStrategy/mongo.js";

export default async function creatUser(req, res) {
    const user = req.body;
    const encryptedPassword = bcrypt.hashSync(user.password, 5);

    await db.collection('users').insertOne({...user, password: encryptedPassword});
    res.status(201).send('Cadastro realizado com sucesso!');
}