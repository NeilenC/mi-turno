import { connectMongoDb } from "../../../../lib/mongodb";
// import Branches from "../../../backend/models/branches";
import Shift from "../../../../backend/models/shift";
// import User from "../../../backend/models/users";

export default async function handler(req, res) {
  await connectMongoDb();

  const { id } = req.query;
  const datosDeActualizacion = req.body;

  if (req.method === "GET") {
    try {
      if (!id) {
        return res.status(400).send("El identificador (id) no está definido.");
      }

      const obtenerReserva = await Shift.findOne({ _id: id });

      if (!obtenerReserva) {
        return res
          .status(404)
          .send("No se encontró ninguna reserva con el id proporcionado.");
      }

      console.log("RESERVA", obtenerReserva);
      return res.status(200).json(obtenerReserva);
    } catch (e) {
      console.log("ERROR BACK ", e);
    }
  }

  if (req.method === "PUT") {
    const modificarReserva = await Shift.findOneAndUpdate(
      { _id: id },
      datosDeActualizacion,
      { updatedAt: new Date(0) },
      { new: true }
    );
    res.status(200).send(modificarReserva);
    try {
    } catch (e) {
      throw e;
    }
  }

  if (req.method === "DELETE") {
    try {
      const borrarReserva = await Shift.findByIdAndDelete({ _id: id });
      // Si se elimina correctamente, se devuelve un mensaje de éxito
      res.status(200).json({ message: "Shift eliminado exitosamente" });
    } catch (error) {
      // Si ocurre un error, se devuelve un mensaje de error
      res.status(500).json({ error: "No se pudo eliminar el shift" });
    }
  } else {
    // Si el método de la solicitud no es DELETE, se devuelve un mensaje de error
    res.status(400).json({ error: "Método no permitido" });
  }
}
