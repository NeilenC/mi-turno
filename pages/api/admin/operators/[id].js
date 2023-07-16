import { connectMongoDb } from "../../../../lib/mongodb";
import User from "../../../../backend/models/users";
import bcrypt from "bcrypt";

//Modificar datos de operadores
export default async function handler(req, res) {
  await connectMongoDb();

  // ------------------------- MODIFICAR OPERADOR ----------------------------

  if (req.method === "PUT") {
    const { id } = req.query;
    const { name, lastname, password, ...restoDatos } = req.body;
    console.log("e", id);

    try {
      const updatedFields = {};

      if (name) {
        const nombreCapitalizado =
          name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        updatedFields.name = nombreCapitalizado;
      }

      if (lastname) {
        const apellidoCapitalizado =
          lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase();
        updatedFields.lastname = apellidoCapitalizado;
      }

      if (password) {
        const user = await User.findOne({ _id: id });
        const hashedPassword = await bcrypt.hash(password, user.salt);
        updatedFields.password = hashedPassword;
      }
      if (restoDatos) {
        updatedFields.restoDatos = restoDatos;
      }

      const updatedOp = await User.findByIdAndUpdate(id, updatedFields, {
        new: true,
      });
      res.status(201).send(updatedOp);
    } catch (e) {
      res.status(500).send("No se pudo actualizar los datos del operador");
    }
  }

  // ---------------------------BORRAR OPERADOR -------------------------------
  if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      const deletedOp = await User.findByIdAndDelete(id);
      if (!deletedOp) {
        res.status(404).send("No se encontró ningún operador con ese ID");
      } else {
        res.send(deletedOp);
      }
    } catch (e) {
      res.status(500).send("No se pudo eliminar el operador");
    }
  }

  if (req.method === "GET") {
    const { id } = req.query;

    try {
      const getOp = await User.findOne({ _id: id });
      res.send(getOp);
    } catch (e) {
      throw e;
    }
  }
}
