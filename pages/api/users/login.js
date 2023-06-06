import { connectMongoDb } from "../../../lib/mongodb"
import User from "../../../backend/models/users"
import  isAuth  from "../../../backend/middlewares/auth"
import { createToken } from "../../../backend/services";

async function handler(req, res) {

    try {
      await connectMongoDb();
      
      const user = await User.findOne({ email: req.body.email });
      
      const isMatch = await user.validatePassword(req.body.password)
      console.log(isMatch, "MATCH")
      if (user && isMatch) {
        const token = createToken(user);
        return  res.status(200).send({user, token}); 
        console.log(token)
      } 

       res.status(401).send({ auth: false, message: "Credenciales inválidas" });
      
    } catch (error) {
      console.log("Error en el login", error);
      res.status(500).send({ message: "Error en el servidor", token: null });
    }
  }

// Envuelve la función handler en una función intermedia para aplicar el middleware
const protectedHandler = (req, res) => {
   handler (req, res, () => {
    isAuth  (req, res);
    });
  };

  export default protectedHandler;