import { connectMongoDb } from "../../../../lib/mongodb";
import Shift from "../../../../backend/models/shift";
// import User from "../../../../backend/models/users";

export default async function handler(req, res) {
  await connectMongoDb();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const getShifts = await Shift.find({branchId: id});

      res.status(201).send(getShifts);
    } catch (e) {
      throw e;
    }
  }
}
