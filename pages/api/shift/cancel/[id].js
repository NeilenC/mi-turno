import { connectMongoDb } from "../../../../lib/mongodb";
// import Branches from "../../../backend/models/branches";
import Shift from "../../../../backend/models/shift";
// import User from "../../../backend/models/users";

export default async function handler(req, res) {
    await connectMongoDb();
  
    const { id } = req.query;
    let {status} = req.body;
    console.log("ID", id , ".NEWSTATE", status)
  try{

    if (req.method === "PUT") {
  
      const shiftStatus = await Shift.findOneAndUpdate(
        { _id: id },
        {status: status},
        { new: true }
      );
      
      res.status(200).json(shiftStatus);
    }
  } catch(e) {
    console.log("ERROR CANCEL", e)
  }
  }
  