import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    await connect("mongodb://127.0.0.1:27017/TrailWithUs");
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB Connection Error:", err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;