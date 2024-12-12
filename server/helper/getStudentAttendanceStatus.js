import { STUDENT_ATTENDANCE_STATUS } from "../constants/StudentAttendanceStatus.js";

export const getStudentAttendanceStatus = (
  attendanceCreatedTime,
  studentTimeIn
) => {
  const createdDate = new Date(attendanceCreatedTime);
  const studentDate = new Date(studentTimeIn);

  const timeDiffMinutes = (studentDate - createdDate) / (1000 * 60); // Convert milliseconds to minutes

  if (timeDiffMinutes < 0) {
    return STUDENT_ATTENDANCE_STATUS.ABSENT; // If the student time is before the attendance was created
  } else if (timeDiffMinutes > 90) { // More than 90 minutes late
    return STUDENT_ATTENDANCE_STATUS.ABSENT; 
  } else if (timeDiffMinutes > 30) { // Late but within 90 minutes
    return STUDENT_ATTENDANCE_STATUS.LATE; 
  } else {
    return STUDENT_ATTENDANCE_STATUS.PRESENT; // Present within 30 minutes
  }
};
