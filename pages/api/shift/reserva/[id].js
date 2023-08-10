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

      return res.status(200).json(obtenerReserva);
    } catch (e) {
      throw e;
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
      res.status(200).json({ message: "Turno eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "No se pudo eliminar el turno" });
    }
  } else {
    res.status(400).json({ error: "Método no permitido" });
  }
}
