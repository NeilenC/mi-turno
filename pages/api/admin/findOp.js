import { connectMongoDb } from "../../../lib/mongodb";
import User from "../../../backend/models/users";

export default async function handler(req, res) {
  await connectMongoDb();

  try {
    //BUSCAR USUARIOS POR SI SON OP O NO
    const operators = await User.find({ isOp: true });
    res.send(operators);
  } catch (e) {
    throw e;
  }
}
