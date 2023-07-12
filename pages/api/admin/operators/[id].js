import { connectMongoDb } from "../../../../lib/mongodb";
import User from "../../../../backend/models/users";

//Modificar datos de operadores
export default async function handler(req, res) {
  await connectMongoDb();

  if (req.method === "PUT") {
    const { id } = req.query;

    try {
      const updatedOp = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      console.log("Operador actualizado backend:", updatedOp);
      res.status(201).send(updatedOp);
    } catch (e) {
      res.status(500).send("No se pudo actualizar los datos del operador");
    }
  }
}
