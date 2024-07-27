import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  planId: {
    type: Number,
    default: 1,
  },
  availableCredit: {
    type: Number,
    default: 5,
  },
});

const User = models?.User || model("User", UserSchema);

export default User;
