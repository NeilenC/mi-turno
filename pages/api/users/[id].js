import { connectMongoDb } from "../../../lib/mongodb";
import User from "../../../backend/models/users";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  try {
    await connectMongoDb();

    switch (req.method) {
      case "PUT":
        const { id } = req.query;
        const { password, ...restoDatos } = req.body;
        const updates = {};

        const user = await User.findOne({ _id: id });

        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }

        if (password) {
          const hashedPassword = await bcrypt.hash(password, user.salt);
          updates.password = hashedPassword;
        }

        if (Object.keys(restoDatos).length > 0) {
          updates.$set = restoDatos;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updates, {
          new: true,
          runValidators: true,
        });

        res.status(200).send(updatedUser);
        break;

      default:
        res.status(405).send({ message: "Method Not Allowed" });
        break;
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
}
