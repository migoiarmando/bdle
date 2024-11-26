import { model, Schema, Types } from "mongoose";

const studentClassSchema = Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    classes: [{ type: Types.ObjectId, ref: "Class", required: true }],
  },
  { timestamps: true }
);

const StudentClass = model("StudentClass", studentClassSchema);

export default StudentClass;
