import { Schema, model, models} from 'mongoose';


const BookingSchema = new Schema ( {
    idBranch: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number:{
        type: String
    }
  
}) 

BookingSchema.pre("save", async function () {
    //aca se crea el numero de la reserva 
})

const Booking = models.Booking || model("Bookings", BookingSchema)

export default Booking;
