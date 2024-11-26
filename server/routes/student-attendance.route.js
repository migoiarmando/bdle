import {
  addStudentAttendance,
  fetchStudentAttendanceByAttendanceId,
  fetchStudentAttendancesByAttendanceId,
  fetchStudentAttendancesByClassId,
} from "../controllers/student-attendance.controller.js";
import { isAuthenticated } from "../middlewares/roleHandler.js";

export default (router) => {
  router.post(
    "/student/attendance/:classId",
    isAuthenticated,
    addStudentAttendance
  );
  router.get(
    "/students/attendance/:attendanceId",
    fetchStudentAttendancesByAttendanceId
  );
  router.get(
    "/student/attendance/:attendanceId",
    isAuthenticated,
    fetchStudentAttendanceByAttendanceId
  );
  router.get(
    "/student/attendances/:classId",
    isAuthenticated,
    fetchStudentAttendancesByClassId
  );
};
