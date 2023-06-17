import { connectMongoDb } from '../../../lib/mongodb';
import Branch from '../../../backend/models/branches';
import User from '../../../backend/models/users';
import Shift from '../../../backend/models/shift';

export default async function handler(req, res) {
  await connectMongoDb();
  const { selectedBranch } = req.body.name;
  const { userId } = req.query;
  console.log(selectedBranch);
  try {
    const branchName = await Branch.findOne(selectedBranch);
    const booking = await Booking.create({
      branchName: branchName,
      phoneNumber: req.body.phoneNumber,
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      date: req.body.date,
      shift: req.body.shift,
    });

    //Asignamos la reserva al usuario
    const user = await User.findOneAndUpdate(
      userId,
      { $push: { bookings: booking._id } },
      { new: true }
    );
    console.log(user, 'USER');
    console.log('BOOKING', booking);
    await booking.save();
    res.status(200).send({ booking, user });
  } catch (e) {
    throw e;
  }
}
