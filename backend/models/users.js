import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

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
  isAdmin: {
    type: Boolean,
    allowNull: true,
  },
  salt: {
    type: String,
  },
  isOp: {
    type: Boolean,
    allowNull: true,
  },
  branchId: {
    type: String,
    allowNull: true,
  },
  phoneNumber: {
    type: String,
    allowNull: true,
  },
  branchName: {
    type: String,
    allowNull: true,
  },
});

UserSchema.pre("save", async function () {
  const salt = bcrypt.genSaltSync();

  this.salt = salt;

  return this.hash(this.password, salt).then((hash) => {
    this.password = hash;
  });
});
UserSchema.methods.hash = async function (password, salt) {
  return bcrypt.hash(password, salt);
};

UserSchema.methods.validatePassword = async function (password) {
  const hash = await this.hash(password, this.salt);
  return this.password === hash;
};

UserSchema.virtual("fullname").get(function () {
  return `${this.name} ${this.lastname}`;
});

//Primera letra de nombre y apellido en mayúscula
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

UserSchema.pre("save", function (next) {
  this.name = capitalizeFirstLetter(this.name);
  this.lastname = capitalizeFirstLetter(this.lastname);
  next();
});

const User = models.User || model("User", UserSchema);

export default User;
