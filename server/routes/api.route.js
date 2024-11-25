import { Router } from "express";
import authRoute from "./auth.route.js";

const router = Router();

export default () => {
  authRoute(router);
  return router;
};
