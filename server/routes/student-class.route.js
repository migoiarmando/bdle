import {
  addStudentClass,
  fetchStudentClass,
} from "../controllers/student-class.controller.js";
import { isAuthenticated } from "../middlewares/roleHandler.js";

export default (router) => {
  router.get("/student/class", isAuthenticated, fetchStudentClass);
  router.post("/student/class", isAuthenticated, addStudentClass);
};
