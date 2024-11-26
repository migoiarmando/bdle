import { model, Schema, Types } from "mongoose";

const classStudentSchema = Schema(
  {
    classId: { type: Types.ObjectId, ref: "Class", required: true },
    students: [{ type: Types.ObjectId, ref: "User", required: true }],
  },
  { timestamps: true }
);

const ClassStudent = model("ClassStudent", classStudentSchema);

export default ClassStudent;
