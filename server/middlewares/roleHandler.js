import jwt from "jsonwebtoken";
import { config } from "dotenv";
import User from "../models/user.model.js";
import merge from "lodash/merge.js";
config();

const { JWT_SECRET_KEY } = process.env;

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided." });

    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - Invalid Token." });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });

    merge(req, { user });

    next();
  } catch (error) {
    next(error);
  }
};
