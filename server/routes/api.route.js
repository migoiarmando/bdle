import { Router } from "express";
import authRoute from "./auth.route.js";
import classRoute from "./class.route.js";
import attendanceRoute from "./attendance.route.js";
import studentClassRoute from "./student-class.route.js";
import studentAttendanceRoute from "./student-attendance.route.js";

const router = Router();

export default () => {
  authRoute(router);
  classRoute(router);
  attendanceRoute(router);
  studentClassRoute(router);
  studentAttendanceRoute(router);
  return router;
};
