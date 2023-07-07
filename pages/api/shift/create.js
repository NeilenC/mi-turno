import { connectMongoDb } from "../../../lib/mongodb";
import Branches from "../../../backend/models/branches";
import Shift from "../../../backend/models/shift";
import check from "./check";

export default async function handler(req, res) {
  await connectMongoDb();

  if (req.method === "POST") {
    try {
      const newShift = await Shift.create(req.body);
      res.status(201).send(newShift);
    } catch (e) {
      console.log("CHAU", e);
    }
  }
}
