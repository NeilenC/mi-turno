import { connectMongoDb } from "../../../lib/mongodb";
import User from "../../../backend/models/users.js";

export default async function handler(req, res) {
  await connectMongoDb();
  try {
    const operator = await User.create(req.body);

    res.status(200).send(operator);
  } catch (e) {
    throw e;
  }
}
