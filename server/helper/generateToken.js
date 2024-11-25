import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const { JWT_SECRET_KEY, NODE_ENV } = process.env;

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, JWT_SECRET_KEY, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: NODE_ENV !== "development",
  });
};

export default generateToken;
