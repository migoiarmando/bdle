import { ClassCardType } from "./class.type";

export type AttendanceType = {
  _id: string;
  classId: ClassCardType;
  professor: string;
  professorId: string;
  attendanceCode: string;
  questionOfTheDay: string;
  createdAt: Date;
  updatedAt: Date;
};
