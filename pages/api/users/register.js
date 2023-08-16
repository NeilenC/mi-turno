import clientPromise, { connectMongoDb } from "../../../lib/mongodb";
import User from "../../../backend/models/users";
import { createToken } from "../../../backend/services";

export default async function handler(req, res) {
  try {
    await connectMongoDb();

    const { password } = req.body;

    // Check if the password meets the requirements
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 9 characters long.' });
    }

    const user = await User.create(req.body);

    res.status(200).send({ token: createToken(user) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred' });
  }
}
