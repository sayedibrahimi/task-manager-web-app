import mongoose from "mongoose";

// monsgoose.connect returns a promise
const connectDB = (url) => {
  return mongoose.connect(url);
};

export default connectDB;
