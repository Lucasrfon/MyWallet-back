import dayjs from "dayjs";
import { db, ObjectId } from "../dbStrategy/mongo.js";

export async function getRegister(req, res) {
    try {
        const registers = await db.collection('registers').find().toArray();
        res.send(registers);
    } catch(error) {
        res.send('Algo de errado não está certo.');
    }
}

export async function postRegister(req, res) {
    try{
        const register = req.body;
        await db.collection('registers').insertOne({...register, date: dayjs().format('DD/MM')});
        res.status(201).send({...register, date: dayjs().format('DD/MM')});
    } catch(error) {
        res.send('Algo de errado não está certo.');
    }
}

export async function updateRegister(req, res) {
    try{
        const register = req.body;
        console.log(new ObjectId(register._id))

        await db.collection('registers').updateOne(
            { _id: new ObjectId(register._id)},
            { $set: {value: 100}}
          );
        res.status(202).send({...register, date: dayjs().format('DD/MM')});
    } catch(error) {
        res.send(error);
    }
}

export async function deleteRegister(req, res) {
    try{
        const register = req.body;
        
        await db.collection('registers').deleteOne({ _id: new ObjectId(register._id)});
        res.send('Registro removido com sucesso!');
    } catch(error) {
        res.send('Algo de errado não está certo.');
    }
}