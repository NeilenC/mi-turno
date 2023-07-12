import { connectMongoDb } from "../../lib/mongodb";
import Branches from "../../backend/models/branches.js";

export default async function handler(req, res) {
  const { id } = req.query;
  await connectMongoDb();
  //--------------------- CREATE BRANCH  ---------------------
  if (req.method === "POST") {
    try {
      const branch = await Branches.create({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        maxCap: req.body.maxCap,
        direction: req.body.direction,
        openingH: req.body.openingH,
        closingH: req.body.closingH,
      });
      await branch.save();
      res.status(200).send(branch);
    } catch (e) {
      throw e;
    }
  }
  //--------------------- OBTENER BRANCHES  ---------------------

  if (req.method === "GET") {
    try {
      const branches = await Branches.find();
      res.send(branches);
    } catch (e) {
      console.error(e);
      res.status(500).send("Error al obtener los datos de las sucursales");
    }
  }
}
