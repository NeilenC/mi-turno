import { connectMongoDb } from "../../../lib/mongodb";
import User from "../../../backend/models/users.js";

export default async function handler(req, res) {
  await connectMongoDb();
  try {
    const { password , ...datos} = req.body;

    if (!isValidPassword(password)) {
      res.status(400).send("La contraseña no cumple con los requisitos.");
      return;
    }

    const operator = await User.create({  password, ...datos});

    res.status(200).send(operator);
  } catch (e) {
    throw e;
  }
}

function isValidPassword(password) {
  // Requisitos de contraseña usuario
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;

  return (
    uppercaseRegex.test(password) &&
    lowercaseRegex.test(password) &&
    numberRegex.test(password) &&
    password.length >= 8
  );
}