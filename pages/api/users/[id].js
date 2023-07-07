import { connectMongoDb } from "../../../lib/mongodb";
import User from "../../../backend/models/users";

export default async function handler(req, res) {
  await connectMongoDb();
  const { id } = req.query;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).send(updatedUser);
  } catch (e) {
    throw e;
  }
}
