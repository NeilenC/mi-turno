import { Schema, model, models} from 'mongoose';


const Branch = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    maxCap: {
        type: Number
    },
    openingH: {
        type: String
    },
    closingH: {
        type: String
    }
    // ,
    // operator: {
    //     type: String
    // }

})

const Branches = models.User || model("branch", Branch )

// // export { mongoose, Schema }
export default Branches