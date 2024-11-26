import { model, Schema, Types } from "mongoose";
import { studentAttendanceStatuses } from "../constants/StudentAttendanceStatus.js";

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

const StudentAttendance = model("StudentAttendance", studentAttendanceSchema);

export default StudentAttendance;
