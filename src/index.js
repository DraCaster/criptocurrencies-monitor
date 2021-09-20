import dotenv from "dotenv";
import express from "express";
import dbConnect from "./mongo-db";
import routes from "./routes-merge";
import cors from "./modules/security/middleware/corsMiddleware";
import jwt from "./modules/security/middleware/jwtMiddleware";

const app = express();
dotenv.config();

const API_PORT = process.env.API_PORT ? process.env.API_PORT : 3000;

const startingApp = async (app) => {

  await dbConnect();

  app.use(cors);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(jwt);
  app.use("/", routes);

  app.listen(API_PORT, () => console.log(`Listening port ${API_PORT}`));
};

startingApp(app)
  .then(() => {
    console.log("Starting API");
  })
  .catch(error => {
    console.error("startingApp error", error);
  });

export default app;