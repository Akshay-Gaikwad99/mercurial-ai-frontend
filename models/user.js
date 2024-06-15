import mongoose from "mongoose";

const { Schema } = mongoose;

const entrySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: Date,
  entryText: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    dob: {
      type: Date,
      required: false,
    },
    oncologistsHospital: {
      type: String,
      required: false,
    },
    joyrideCompleted: {
      type: Boolean,
      default: false,
    },
    entries: [entrySchema],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
