import { connectMongoDb } from "../../../lib/mongodb";
import Shift from "../../../backend/models/shift";

export default async function handler(req, res) {
  await connectMongoDb();

  if (req.method === "POST") {
    // Cambiamos de GET a POST para enviar el DNI en el body
    try {
      const { dni } = req.body; // Ahora esperamos el DNI en el body de la solicitud

      const getShift = await Shift.find({ DNI: dni }); // Asegúrate de que el campo sea "DNI" o el nombre correcto en tu modelo de datos

      res.status(200).json(getShift); // Cambiamos 201 a 200, ya que es más apropiado para una respuesta exitosa en una búsqueda
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al obtener los turnos" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
