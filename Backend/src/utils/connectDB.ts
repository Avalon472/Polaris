import mongoose from "mongoose";

// Declare separate variables to prevent parallel connections
// causing a race condition or competing promises
let cachedConnection: typeof mongoose | null = null;
let cachedPromise: Promise<typeof mongoose> | null = null;

// Serveless approach to only use connection
// when required instead of keeping open
export const connectMongoDB = async () => {
  // Return warm connection if available
  if (cachedConnection) {
    return cachedConnection;
  }

  // Ensures connection only has to establish once
  if (!cachedPromise) {
    cachedPromise = mongoose.connect(process.env.MONGO_URI!);
  }

  cachedConnection = await cachedPromise;

  if (cachedConnection) {
    console.log(`MongoDB connected: ${cachedConnection.connection.host}`);
  }
  return cachedConnection;
};

export default connectMongoDB;
