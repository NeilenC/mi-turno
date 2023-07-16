import { connectMongoDb } from "../../../../lib/mongodb";
import Branches from "../../../../backend/models/branches";

export default async function handler(req, res) {
  const { id } = req.query;
  await connectMongoDb();
  //--------------------- MODIFICAR BRANCH  ---------------------

  if (req.method === "PUT") {
    try {
      const updatedBranch = await Branches.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(201).send(updatedBranch);
    } catch (e) {
      throw e;
    }
  }
  //--------------------- BORRAR BRANCH  ---------------------

  if (req.method === "DELETE") {
    try {
      const deleteBranch = await Branches.findByIdAndDelete(id);
      res.status(201).send(deleteBranch);
    } catch (e) {
      throw e;
    }
  }

  //--------------------- OBTENER UNA BRANCH ---------------------
  if (req.method === "GET") {
    // const { id } = req.query;

    try {
      const getBranch = await Branches.findOne({ _id: id });
      res.send(getBranch);
    } catch (e) {
      throw e;
    }
  }
}
