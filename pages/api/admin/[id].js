// import { connectMongoDb } from "../../../lib/mongodb";
// import Branches from "../../../backend/models/branches";

// export default async function handler(req, res) {
//   await connectMongoDb();

//   if (req.method === "PUT") {
//     const { id } = req.query;

//     try {
//       const updatedBranch = await Branches.findByIdAndUpdate(
//         id,
//         { $set: req.body },
//         { new: true }
//       );
//       res.status(201).send(updatedBranch);
//     } catch (e) {
//       throw e;
//     }
//   }

//   if (req.method === "DELETE") {
//     const { id } = req.query;

//     try {
//       const deletedBranch = await Branches.findOneAndDelete(id);
//       res.send(deletedBranch);
//     } catch (e) {
//       throw e;
//     }
//   }
// }
