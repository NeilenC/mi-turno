import { connectMongoDb } from '../../../../lib/mongodb';
import User from '../../../../backend/models/users';

export default async function handler(req,res) {
  await connectMongoDb();
  if(req.method === "GET") {

    const { id } = req.query;
    try {
      const response = await User.findOne({_id: id});
      res.status(200).send(response);
      
    } catch (e) {
      console.log("RESPONSE CATCH" , e)
      throw e;
    }
  }
}
