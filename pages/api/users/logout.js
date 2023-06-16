import { connectMongoDb } from "../../../lib/mongodb"
import User from "../../../backend/models/users"

// Ruta para el logout
async function logoutHandler(req, res) {
  try {
    await connectMongoDb();

    // Implementa el código necesario para cerrar la sesión del usuario
    // Puedes borrar el token de autenticación, eliminar la información de sesión, etc.
    

    res.status(200).send({ message: "Logout exitoso" });
  } catch (error) {
    console.log("Error en el logout", error);
    res.status(500).send({ message: "Error en el servidor" });
  }
}

export default logoutHandler;
