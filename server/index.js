import { config } from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
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

/** Connect the Frontend */
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server running on port http://localhost:${PORT}.`);
});
