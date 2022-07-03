import { db } from "../dbStrategy/mongo.js";

export async function getRegister(req, res) {
    try {
        const registers = await db.collection('registers').find().toArray();
        res.send(registers);
    } catch(error) {
        res.send('Algo de errado não está certo.');
    }
}