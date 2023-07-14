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
      res.status(201).send(updatedOp);
    } catch (e) {
      res.status(500).send("No se pudo actualizar los datos del operador");
    }
  }
  if(req.method === "DELETE") {
    const { id } = req.query;
 
    try{

      const deletedOp = await User.findByIdAndDelete(id)
      if (!deletedOp) {
        res.status(404).send("No se encontró ningún operador con ese ID");
      } else {
        res.send(deletedOp);
      }

    }catch(e){
      res.status(500).send("No se pudo eliminar el operador")
    }
  }
}
