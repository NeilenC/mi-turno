import { connectMongoDb } from "../../../lib/mongodb";
import Shift from "../../../backend/models/shift";

export default async function handler(req, res) {
  await connectMongoDb();
  if (req.method === "POST") {
    try {
      const newShift = await Shift.create(req.body);
      
      await newShift.save();
      console.log("SHIF", newShift);

      res.status(201).send(newShift);
    } catch (e) {
      console.log("create del shift", e);
      res.status(500).send("Error al crear el turno");
    }
  }
}
