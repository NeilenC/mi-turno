import { connectMongoDb } from '../../../lib/mongodb';
import User from '../../../backend/models/users.js';

export default async function handler(req, res) {
  await connectMongoDb();
  try {
    const operator = await User.create(req.body);
    // {name: req.body.name,
    // lastname: req.body.lastname,
    // email: req.body.email,
    // DNI: req.body.DNI,
    // password: req.body.password,
    // branch: req.body.branch,}

    await operator.save();

    res.status(200).send(operator);
  } catch (e) {
    throw e;
  }
}
