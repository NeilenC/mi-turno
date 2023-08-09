import { connectMongoDb } from "../../../../lib/mongodb";
import Branch from "../../../../backend/models/branches";
import User from "../../../../backend/models/users";
import Shift from "../../../../backend/models/shift";

//Obtenemos las reservas que tiene el usuario
export default async function handler(req, res) {
  await connectMongoDb();

  // NO DEVUELVE TURNOS DE UN USUARIO EN ESPECIFICO

  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const userShifts = await Shift.find({ userId: id });
      res.status(200).send(userShifts);
    } catch (e) {
      console.log("ERROR VER RESERVAS", e);
      throw e;
    }
  }
}
