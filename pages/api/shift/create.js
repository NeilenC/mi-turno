import { connectMongoDb } from "../../../lib/mongodb"; 
import Branches from "../../../backend/models/branches";
import Booking from "../../../backend/models/shift";

export default async function handler(req,res) {
    await connectMongoDb()

    
}