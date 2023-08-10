import { connectMongoDb } from "../../../../lib/mongodb";
import Shift from "../../../../backend/models/shift";

//Obtenemos las reservas que tiene el usuario
export default async function handler(req, res) {
  await connectMongoDb();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const detalleReserva = await Shift.findOne({ _id: id });
      if (detalleReserva) {
        res.status(200).send([detalleReserva]);
      } else {
        res.status(404).send([]);
      }
    } catch (e) {
      res.status(500).send("Error al obtener la reserva");
    }
  }
}
