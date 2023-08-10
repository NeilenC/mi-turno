import { Schema, model, models } from "mongoose";

const ShiftSchema = new Schema({
  branchId: {
    type: String,
    required: true,
    allowNull: false,
  },
  fullname: {
    type: String,
  },
  date: {
    type: String,
    allowNull: false,
  },
  shift: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  DNI: {
    type: Number,
  },
  bookingNumber: {
    type: String,
  },
  branchName: {
    type: String,
  },
  creatingDate: {
    type: String,
  },
  status: {
    type: String,
    default: "confirmada",
  },
});

ShiftSchema.pre("save", function () {
  //aca se crea el numero de la reserva
  if (!this.bookingNumber) {
    const randomBookingNumber = generateRandomBookingNumber();
    return (this.bookingNumber = randomBookingNumber);
  }
});

function generateRandomBookingNumber() {
  const characters = "0123456789";
  let bookingNumber = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    bookingNumber += characters.charAt(randomIndex);
  }
  return bookingNumber;
}

const Shift = models.Shift || model("Shift", ShiftSchema);

export default Shift;
