import { model, Schema, Types } from "mongoose";
import { ATTENDANCE_STATUS, status } from "../constants/AttendanceStatus.js";

const attendanceSchema = Schema(
  {
    classId: { type: Types.ObjectId, ref: "Class", required: true },
    professorId: { type: Types.ObjectId, ref: "User", required: true },
    professor: { type: String, required: true },
    attendanceCode: { type: String, required: true },
    questionOfTheDay: { type: String, required: true },
    status: { type: String, enum: status, default: ATTENDANCE_STATUS.ACTIVE },
  },
  { timestamps: true }
);

const Attendance = model("Attendance", attendanceSchema);

export default Attendance;
