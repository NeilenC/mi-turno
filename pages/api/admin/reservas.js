import { connectMongoDb } from "../../../lib/mongodb";
import Shift from "../../../backend/models/shift";

export default async function handler(req, res) {
  await connectMongoDb();
  if (req.method === "GET") {
    try {
      //Ver todas las reservas
      const reservas = await Shift.find();
      res.send(reservas);
    } catch (e) {
      throw e;
    }
  }
}
