import { connectMongoDb } from "../../../../lib/mongodb";
import User from "../../../../backend/models/users"


export default async function handler() {
  await connectMongoDb()
  const {id} = req.query
    console.log("IDDD", id)
        try{
            const response = await User.findOne(id)

            res.send(response)
        }catch(e) {
            throw(e)
        }
    
}