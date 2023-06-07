import { connectMongoDb } from "../../../lib/mongodb"
import Branches from "../../../backend/models/branches"


export default async function handler(req,res) {
    await connectMongoDb()

      const {id} = req.params._id
      console.log(id)
      const {updates} = req.body
      try{
        const updatedBranch = await Branches.findByIdAndUpdate(id, updates)
        res.status(201).send(updatedBranch)
      } catch(e) {
        throw e
      }
}