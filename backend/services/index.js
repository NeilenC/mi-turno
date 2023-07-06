const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config/index');

function createToken(user) {
  const payload = {
    sub: user._id, //el atributo sub corresponde al ID del usuario
    iat: moment().unix(), // fecha de creación del token con moment
    exp: moment().add(14, 'days').unix(), // Expiracion en 14 días desde su creación
  };

  return jwt.encode(payload, config.secret);
}

function decodeToken(token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.secret);

      if (payload.exp <= moment().unix()) {
        resolve({
          status: 401,
          message: 'el token ha expirado',
        });
      }

      resolve(payload.sub);
    } catch (err) {
      reject({
        status: 500,
        message: 'invalid token',
      });
    }
  });

  return decoded; //Devolviendo la promesa
}

module.exports = { createToken, decodeToken };
