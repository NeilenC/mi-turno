//GET all branches
//GET branch
//UPDATE branch
//DELETE branch
import { connectMongoDb } from '../../lib/mongodb';
import Branches from '../../backend/models/branches.js';

export default async function handler(req, res) {
  await connectMongoDb();
  //--------------------- CREATE BRANCH  ---------------------
  if (req.method === 'POST') {
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

  if (req.method === 'GET') {
    try {
      const branches = await Branches.find();
      res.send(branches);
    } catch (e) {
      console.error(e);
      res.status(500).send('Error al obtener los datos de las sucursales');
    }
  }
  //--------------------- MODIFICAR BRANCH  ---------------------

  // if(req.method === "PUT") {
  //   const {name} = req.body.phoneNumber
  //   console.log(name)
  //   const {updates} = req.body
  //   try{
  //     const updatedBranch = await Branches.findOneAndUpdate(name, updates)
  //     res.status(201).send(updatedBranch)
  //   } catch(e) {
  //     throw e
  //   }
  // }
  //--------------------- BORRAR BRANCH  ---------------------

  //  if(req.method === "DELETE") {

  //  }
}
