import { model, Schema, Types } from "mongoose";
import {
  STUDENT_ATTENDANCE_STATUS,
  studentAttendanceStatuses,
} from "../constants/StudentAttendanceStatus.js";
import Class from "./class.model.js";
import Attendance from "./attendance.model.js";

const studentAttendanceSchema = Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  classId: { type: Types.ObjectId, ref: "Class", required: true },
  attendanceId: { type: Types.ObjectId, ref: "Attendance", required: true },
  attendanceCode: { type: String, required: true },
  studentIGN: { type: String, required: true },
  answerOfTheDay: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  status: { type: String, enum: studentAttendanceStatuses },
});

// Middleware to check lateness before saving
studentAttendanceSchema.pre("save", async function (next) {
  const studentAttendance = this;

  const classData = await Class.findById(studentAttendance.classId).select(
    "scheduleStart"
  );
  const attendanceData = await Attendance.findById(
    studentAttendance.attendanceId
  ).select("createdAt");

  if (!classData) {
    throw new Error("Class not found");
  }
  if (!attendanceData) {
    throw new Error("Attendance not found");
  }

  const classScheduleStart = classData.scheduleStart;
  const attendanceDate = attendanceData.createdAt;

  const [hours, minutes] = classScheduleStart.split(":").map(Number);

  const scheduleStartDate = new Date(
    attendanceDate.getFullYear(),
    attendanceDate.getMonth(),
    attendanceDate.getDate(),
    hours,
    minutes
  );

  const timeDiffMs =
    studentAttendance.createdAt.getTime() - scheduleStartDate.getTime();
  const timeDiffMinutes = timeDiffMs / (1000 * 60);

  if (timeDiffMinutes > 30) {
    studentAttendance.status = STUDENT_ATTENDANCE_STATUS.ABSENT;
  } else if (timeDiffMinutes > 15) {
    studentAttendance.status = STUDENT_ATTENDANCE_STATUS.LATE;
  } else {
    studentAttendance.status = STUDENT_ATTENDANCE_STATUS.PRESENT;
  }

  next();
});

const StudentAttendance = model("StudentAttendance", studentAttendanceSchema);

export default StudentAttendance;
