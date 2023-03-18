import mongoose from "mongoose";
const { Schema, model } = mongoose;

export  const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide unique UserName"],
    unique: [true, "User Exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide a Password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: Number },
  address: { type: String },
  profile: { type: String },
});


export default model("User", UserSchema)