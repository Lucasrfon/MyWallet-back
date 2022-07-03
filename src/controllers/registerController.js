import dayjs from "dayjs";
import { db, ObjectId } from "../dbStrategy/mongo.js";

export async function getRegister(req, res) {
    try {
        const session = res.locals.session;
        const registers = await db.collection('registers').find({userId: new ObjectId(session.userId)}).toArray();
        registers.forEach(register => delete register.userId);
        res.send(registers);
    } catch(error) {
        res.send('Algo de errado não está certo.');
    }
}

export async function postRegister(req, res) {
    try{
        const register = req.body;
        const session = res.locals.session;

        await db.collection('registers').insertOne({
            ...register, 
            date: dayjs().format('DD/MM'), 
            userId: new ObjectId(session.userId)
        });
        res.status(201).send({...register, date: dayjs().format('DD/MM')});
    } catch(error) {
        res.send('Algo de errado não está certo.');
    }
}

export async function updateRegister(req, res) {
    try{
        const registerId = res.locals.registerId
        const register = req.body;
        delete register._id;

        await db.collection('registers').updateOne(
            { _id: registerId},
            { $set: {...register, date: dayjs().format('DD/MM')}}
          );
        res.status(202).send();
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