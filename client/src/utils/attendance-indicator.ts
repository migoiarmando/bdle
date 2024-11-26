import { StudentAttendanceType } from "../types/student-attendance.types";
import presentCircle from "../assets/student-status/present-circle-icon.svg";
import lateCircle from "../assets/student-status/late-circle-icon.svg";
import absentCircle from "../assets/student-status/absent-circle-icon.svg";

export const indicator = (studentAttendance: StudentAttendanceType) => {
  const attendanceStatusIndicators = {
    Present: presentCircle,
    Late: lateCircle,
    Absent: absentCircle,
  };
  return attendanceStatusIndicators[studentAttendance.status];
};
