import { connectMongoDb } from '../../../lib/mongodb';
import User from '../../../backend/models/users';
import isAuth from '../../../backend/middlewares/auth';
import { createToken } from '../../../backend/services';

async function handler(req, res) {
  try {
    await connectMongoDb();
    const user = await User.findOne({ email: req.body.email });

    
    const isMatch = await user.validatePassword(req.body.password, 8);

    if (user && isMatch) {
      const token = createToken(user);
      return res.status(200).send({ user, token });
    }

    res.status(401).send({ auth: false, message: 'Credenciales inválidas' });
  } catch (error) {
    res.status(500).send({ message: 'Error en el servidor', token: null });
  }
}

// Envuelve la función handler en una función intermedia para aplicar el middleware
const protectedHandler = (req, res) => {
  handler(req, res, () => {
    isAuth(req, res);
  });
};

export default protectedHandler;

// Importa los módulos necesarios
// import { connectMongoDb } from "../../../lib/mongodb";
// import User from "../../../backend/models/users";
// import bcrypt from "bcryptjs";

// Función de login
// async function loginHandler(req, res) {
//   try {
//     await connectMongoDb();

//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).send({ message: "Credenciales inválidas" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (isMatch) {
//       const token = createToken(user);
//       return res.status(200).send({user, token,  message: "Login exitoso"});

//     } else {

//       return res.status(401).send({ message: "Credenciales inválidas" });
//     }
//   } catch (error) {
//     console.log("Error en el login", error);
//     res.status(500).send({ message: "Error en el servidor" });
//   }
// }

// Función de logout
// async function logoutHandler(req, res) {
//   try {
//     // Realiza las acciones necesarias para el logout
//     // Elimina el token de autenticación, cierra la sesión, etc.
//     // ...

//     res.status(200).send({ message: "Logout exitoso" });
//   } catch (error) {
//     console.log("Error en el logout", error);
//     res.status(500).send({ message: "Error en el servidor" });
//   }
// }

// const protectedHandler = (req, res) => {
//   loginHandler (req, res, () => {
//     isAuth  (req, res);
//     });
//   };

//   export default protectedHandler;
