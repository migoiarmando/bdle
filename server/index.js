import { config } from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import connectToMongoDb from "./db/connectToMongoDb.js";
import apiRoute from "./routes/api.route.js";

/** Initialization */
config();

/** Variables */
const app = express();
const PORT = process.env.PORT || 5000;

/** Middlewares */
app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRoute());

app.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server running on port http://localhost:${PORT}.`);
});
