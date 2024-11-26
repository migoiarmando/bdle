import {
  addAttendance,
  fetchAttendancesByClassId,
  fetchAttendancesById,
  fetchLatestAttendance,
} from "../controllers/attendance.controller.js";
import { isAuthenticated } from "../middlewares/roleHandler.js";

export default (router) => {
  router.get("/attendance/latest/:classId", fetchLatestAttendance);
  router.get("/attendance/:attendanceId", fetchAttendancesById);
  router.get("/attendances/:classId", fetchAttendancesByClassId);
  router.post("/attendance/:classId", isAuthenticated, addAttendance);
};
