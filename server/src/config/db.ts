import mongoose from "mongoose";

const connectDb = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error(
      "MONGO_URI environment variable is not set. Add it to server/.env"
    );
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB.");
};

export default connectDb;