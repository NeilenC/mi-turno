import { connectMongoDb } from "../../../lib/mongodb";
import Shift from "../../../backend/models/shift";

export default async function handler(req, res) {
  await connectMongoDb();
  if (req.method === "POST") {
    try {
      const newShift = new Shift(req.body);
      console.log("SHIF", newShift);

      await newShift.save();

      res.status(201).send(newShift);
    } catch (e) {
      console.log("CHAU", e);
      res.status(500).send("Error al crear el turno");
    }
  }
}
