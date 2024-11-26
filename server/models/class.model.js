import { model, Schema, Types } from "mongoose";

const classSchema = Schema(
  {
    classCode: { type: String, unique: true, required: true },
    className: { type: String, required: true },
    professorId: { type: Types.ObjectId, ref: "User", required: true },
    section: { type: String, required: true },
    scheduleDay: { type: String, required: true },
    scheduleStart: { type: String, required: true },
    scheduleEnd: { type: String, required: true },
    theme: { type: String, required: true },
  },
  { timestamps: true }
);

const Class = model("Class", classSchema);

export default Class;
