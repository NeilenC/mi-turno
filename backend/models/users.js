import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';

//Definir esquema de mongoose
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  DNI: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
    },
  ],
  isAdmin: {
    type: Boolean,
  },
  salt: {
    type: String
  },
  isOp: {
    type: Boolean,
  },
  branch: {
    type: String,
  },
});

// UserSchema.pre('save', async function (next) {
//   try {
//     // const salt = await bcrypt.genSalt();
//     console.log(' this paswword PAAAA PAM PAM', this.password)
//     const hashedPassword = await bcrypt.hash(this.password, 8);
//     this.password = hashedPassword;
//     next();
//   } catch (e) {
//     next(e);
//   }
// });
UserSchema.pre('save', async function() {
  const salt = bcrypt.genSaltSync()

  this.salt = salt

  return this.hash(this.password, salt).then(hash => {
    this.password = hash
  })
})
UserSchema.methods.hash = async function (password, salt) {
    return bcrypt.hash(password, salt);
}

UserSchema.methods.validatePassword = async function (password) {
  
    const hash = await this.hash(password, this.salt);
    return this.password === hash;
};

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
