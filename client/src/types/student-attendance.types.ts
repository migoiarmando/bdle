import { UserType } from "./user.types";

export enum StudentAttendanceStatusType {
  PRESENT = "Present",
  LATE = "Late",
  ABSENT = "Absent",
}

export type StudentAttendanceType = {
  _id: string;
  userId: UserType;
  classId: string;
  attendanceId: string;
  attendanceCode: string;
  studentIGN: string;
  answerOfTheDay: string;
  status: StudentAttendanceStatusType;
  createdAt: Date;
};
