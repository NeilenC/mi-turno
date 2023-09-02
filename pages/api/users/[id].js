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
          return res.status(404).send({ message: "Usuario no encontrado" });
        }

        if (password) {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,}$/;
          if (!passwordRegex.test(password)) {
            return res
              .status(400)
              .json({
                error:
                  "La contraseña debe contar con las características requeridas",
              });
          }
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
        res.status(405).send({ message: "Metodo no permitido" });
        break;
    }
  } catch (error) {
    res.status(500).send({ message: "Error" });
  }
}
