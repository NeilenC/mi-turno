import { Schema, model, models} from 'mongoose';


const BookingSchema = new Schema ( {
    branchName: {
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
    bookingNumber:{
        type: String
    },
    date: {
        type: String
    },
    shift: {
        type: String
    }
  
}) 

BookingSchema.pre("save", function () {
    //aca se crea el numero de la reserva 
    if(!this.bookingNumber) {
        const randomBookingNumber = generateRandomBookingNumber()
        return this.bookingNumber = randomBookingNumber;
    }
})

function generateRandomBookingNumber  () {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let bookingNumber = ""
    for(let i=0 ; i< 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        bookingNumber += characters.charAt(randomIndex)
    }
    return bookingNumber;
}

const Booking = models.Booking || model("Bookings", BookingSchema)

export default Booking;
