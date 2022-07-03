import { db } from "../dbStrategy/mongo.js";

export default async function validateAuth(req, res, next) {
    const { authorization } = req.headers;

  const token = authorization?.replace('Bearer ', '');
  const session = await db.collection('sessions').findOne({ token });

  if (!session) {
    return res.sendStatus(401);
  }

  res.locals.session = session;
  next();
}