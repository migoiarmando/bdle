import {
  register,
  login,
  logout,
  googleLogin,
  updateProfile,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/roleHandler.js";

export default (router) => {
  router.post("/auth/google", googleLogin);
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/auth/logout", logout);
  router.put("/auth/profile", isAuthenticated, updateProfile);
};
