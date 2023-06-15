import { Schema, model, models} from 'mongoose';
// import moment from "moment"


const Branch = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    direction: {
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
    // openingH: {
    //     type: String,
    //     set: function (value) {
    //       // Establecer el formato deseado al valor del campo openingH utilizando Moment.js
    //       return moment(value, 'HH:mm').format('HH:mm');
    //     }
    //   },
    //   closingH: {
    //     type: String,
    //     set: function (value) {
    //       // Establecer el formato deseado al valor del campo closingH utilizando Moment.js
    //       return moment(value, 'HH:mm').format('HH:mm');
    //     }
    //   }

})

const Branches = models.User || model("branch", Branch )

// // export { mongoose, Schema }
export default Branches