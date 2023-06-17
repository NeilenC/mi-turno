import clientPromise, { connectMongoDb } from '../../../lib/mongodb';
import User from '../../../backend/models/users';
import { createToken } from '../../../backend/services';

export default async function handler(req, res) {
  try {
    await connectMongoDb();
console.log('REGISTER USER', req.body)
    const user = await User.create(req.body);
    
    
    console.log('INFO', user);
    res.status(200).send({ token: createToken(user) });
  } catch (e) {
    console.log(e);
    throw e;
  }
} 
