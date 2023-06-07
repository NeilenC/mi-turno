//GET all branches
//GET branch 
//UPDATE branch
//DELETE branch
import { connectMongoDb } from "../../lib/mongodb"
import Branches from "../../backend/models/branches"


export default async function handler (req,res, next) {

    await connectMongoDb()
//--------------------- CREATE BRANCH  ---------------------
    if(req.method === "POST") {
      try{
        const branch = await Branches.create({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            maxCap: req.body.maxCap,
            openingH: req.body.openingH,
            closingH: req.body.closingH
    
        })
        await branch.save()
        res.status(200).send(branch) 
     }  catch (e) {
        next(err);
     }
    }
//--------------------- OBTENER BRANCHES  ---------------------

    if(req.method === "GET") {
      try{
        const branches = await Branches.find()
        res.send(branches)
      } catch(e){
        throw e
      }
    }

//--------------------- MODIFICAR BRANCH  ---------------------

    // if(req.method === "PUT") {
    //   const {id} = req.params
    //   console.log(id)
    //   const {updates} = req.body
    //   try{
    //     const updatedBranch = await Branches.findByIdAndUpdate(id, updates)
    //     res.status(201).send(updatedBranch)
    //   } catch(e) {
    //     throw e
    //   }
    // }
//--------------------- BORRAR BRANCH  ---------------------

    //  if(req.method === "DELETE") {

    //  }
}