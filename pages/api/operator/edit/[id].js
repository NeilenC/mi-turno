import { connectMongoDb } from "../../../../lib/mongodb";
import User from "../../../../backend/models/users";

export default async function handler(req, res) {
  await connectMongoDb();
  const { id } = req.query;
  // const {update} = req.body

  try {
    const updatedOperator = await User.findByIdAndUpdate(
      { _id: id },
      {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        branchId: req.body.branchId,
        branchName: req.body.branchName,
        DNI: req.body.DNI,
      }
    );
    console.log(updatedOperator);
    // await updatedOperator.save();

    res.status(201).send(updatedOperator);
  } catch (e) {
    throw e;
  }
}
