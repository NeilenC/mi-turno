import { connectMongoDb } from "../../../../lib/mongodb";
import Branch from "../../../../backend/models/branches";
import User from "../../../../backend/models/users";
import Shift from "../../../../backend/models/shift";

//Obtenemos las reservas que tiene el usuario
export default async function handler(req, res) {
  await connectMongoDb();

  const { userId } = req.query;

  if (req.method === "GET") {
    try {
      const userShifts = await Shift.find({ userId });

      res.status(200).send(userShifts);
    } catch (e) {
      console.log("ERROR BACKEND", e);
      throw e;
    }
  }
}
