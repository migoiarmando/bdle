import {
  addClass,
  fetchClassById,
  fetchClasses,
} from "../controllers/class.controller.js";
import { isAuthenticated } from "../middlewares/roleHandler.js";

export default (router) => {
  router.get("/classes/:professorId", fetchClasses);
  router.get("/class/:classId", fetchClassById);
  router.post("/class", isAuthenticated, addClass);
};
