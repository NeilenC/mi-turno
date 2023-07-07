import { connectMongoDb } from "../../../lib/mongodb";
import User from "../../../backend/models/users";

export default async function handler(req, res) {
  await connectMongoDb();
  if (req.method === "GET") {
    try {
      const users = await User.find();
      res.send(users);
    } catch (e) {
      throw e;
    }
  }
}
