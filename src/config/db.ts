import mongoose from "mongoose";


const connectionString: string = process.env.MONGODB_URL || "";

const connectDb = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to the Chat database");
  } catch (error) {
    console.error("Error connecting to the Chat database");
    process.exit(1);
  }
};

export default connectDb;
