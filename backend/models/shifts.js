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
    }
  
}) 

const Booking = models.Booking || model("Bookings", BookingSchema)

export default Booking;
