import 'dotenv/config';
import { connect } from 'mongoose';

const connectDB = async () => {
  const MongoDB = process.env.MongoDB || "mongodb://127.0.0.1:27017/TrailWithUs";

  try {
    await connect(MongoDB);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB Connection Error:", err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;