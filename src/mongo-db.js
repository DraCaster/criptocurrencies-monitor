import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async () => {
  if (!process.env.MONGO_URI) { throw new Error("process.env.MONGO_URI is required!"); }

  try {
    await connectToMongo(mongoose, process.env.MONGO_URI);
  } catch (error) {
    console.error("Connection to Mongo error " + error);
    // Retry connecting to Mongo
    setTimeout(dbConnect, 1000);
  }
};

const connectToMongo = function (mongoose, mongoUri) {
  return new Promise((resolve, reject) => {
    console.log("Trying to connect to Mongo");

    mongoose.Promise = global.Promise;

    mongoose.connect(mongoUri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log("Mongoose connected");
        resolve();
      })
      .catch(error => {
        console.error("Mongoose not connected");
        reject(error);
      });
  });
};

module.exports = dbConnect;
