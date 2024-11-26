import { model, Schema, Types } from "mongoose";

const attendanceSchema = Schema(
  {
    classId: { type: Types.ObjectId, ref: "Class", required: true },
    professorId: { type: Types.ObjectId, ref: "User", required: true },
    professor: { type: String, required: true },
    attendanceCode: { type: String, required: true },
    questionOfTheDay: { type: String, required: true },
  },
  { timestamps: true }
);

const Attendance = model("Attendance", attendanceSchema);

export default Attendance;
