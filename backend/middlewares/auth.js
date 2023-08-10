const jwt = require("jwt-simple");
const config = require("../config");
import { decodeToken } from "../services";

export default function isAuth(req, res, next) {
  //si no existe el campo authorization en el header del objeto request, se envía un estado de prohibido el acceso
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "no tienes autorización" });
  }
  //podemos desglosar el token con un split en la posición 1 del arr
  const token = req.headers.authorization.split(" ")[1];

  decodeToken(token)
    .then((response) => {
      req.user = response;
      next();
    })
    .catch((response) => {
      res.status(response.status);
    });
}
