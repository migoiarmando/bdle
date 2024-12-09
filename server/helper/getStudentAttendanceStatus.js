import { STUDENT_ATTENDANCE_STATUS } from "../constants/StudentAttendanceStatus.js";

export const getStudentAttendanceStatus = (scheduleStart, studentTimeIn, attendanceCreatedAt) => {
  const [hours1, minutes1] = scheduleStart.split(":").map(Number);
  const [hours2, minutes2] = studentTimeIn.split(":").map(Number);

  const totalMinutes1 = hours1 * 60 + minutes1;
  const totalMinutes2 = hours2 * 60 + minutes2;

  let timeDiffMinutes = totalMinutes2 - totalMinutes1;

  if (timeDiffMinutes < 0) {
    timeDiffMinutes += 24 * 60; // Add 24 hours in minutes
  }

  const attendanceCreatedTime = new Date(attendanceCreatedAt).getTime();
  const currentTime = new Date().getTime();
  const timeSinceCreation = (currentTime - attendanceCreatedTime) / (1000 * 60); // Convert to minutes

  if (timeSinceCreation > 90) {
    return STUDENT_ATTENDANCE_STATUS.ABSENT;
  } else if (timeSinceCreation > 30) {
    return STUDENT_ATTENDANCE_STATUS.LATE;
  } else {
    return STUDENT_ATTENDANCE_STATUS.PRESENT;
  }
};
