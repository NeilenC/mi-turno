import { Schema, model, models} from 'mongoose';
import bcrypt from "bcryptjs";


//Definir esquema de mongoose
const UserSchema = new Schema ( {
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    DNI: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
      type: String,
      required: true,
        unique: true
    },
    isAdmin: {
      type: Boolean
  } ,
    isOp: {
      type: Boolean
  } ,
   branch: {
    type: String
  }
}
 )

  UserSchema.pre("save", async function (next) {
     try {
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(this.password, salt)
     this.password = hashedPassword
     next()
     
     } catch(e) {
         next(e)
     }
  })


  UserSchema.methods.validatePassword = async function (password) {
    try{

      return await bcrypt.compare(password, this.password)
    } catch(e){

      throw e
    }
  }



   const User = models.User || model('User', UserSchema);

   export default User;


 // el hook "pre" se ejecuta antes de guardar un documento en la base de datos.
 //Se genera un "salt" aleatorio y único automáticamente en el proceso de hasheo.

// export async function validatePassword (password, hashedPassword) {
//         try {
//           const isMatch = await bcrypt.compare(password, hashedPassword);
//           return isMatch;
//         } catch (error) {
//           throw error;
//         }
//       }





