import { Schema, model, models } from 'mongoose';

const ShiftSchema = new Schema({
  branchId: {
    type: String,
    required: true,
  },
  branchName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  bookingNumber: {
    type: String,
  },
  date: {
    type: String,
  },
  shift: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true
  }
});

ShiftSchema.pre('save', function () {
  //aca se crea el numero de la reserva
  if (!this.bookingNumber) {
    const randomBookingNumber = generateRandomBookingNumber();
    return (this.bookingNumber = randomBookingNumber);
  }
});

function generateRandomBookingNumber() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let bookingNumber = '';
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    bookingNumber += characters.charAt(randomIndex);
  }
  return bookingNumber;
}

const Shift = models.Shift || model('Shift', ShiftSchema);

export default Shift;
