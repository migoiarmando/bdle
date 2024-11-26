import { useMemo } from "react";
import {
  StudentAttendanceStatusType,
  StudentAttendanceType,
} from "../types/student-attendance.types";

const useAttendanceStatusCounter = ({
  studentAttendances,
}: {
  studentAttendances: StudentAttendanceType[] | [];
}) => {
  const presentCount = useMemo(() => {
    return studentAttendances.filter(
      (studentAttendance) =>
        studentAttendance.status === StudentAttendanceStatusType.PRESENT
    ).length;
  }, [studentAttendances]);
  const lateCount = useMemo(() => {
    return studentAttendances.filter(
      (studentAttendance) =>
        studentAttendance.status === StudentAttendanceStatusType.LATE
    ).length;
  }, [studentAttendances]);
  const absentCount = useMemo(() => {
    return studentAttendances.filter(
      (studentAttendance) =>
        studentAttendance.status === StudentAttendanceStatusType.ABSENT
    ).length;
  }, [studentAttendances]);

  return { presentCount, lateCount, absentCount };
};

export default useAttendanceStatusCounter;
