import { ClassCardType } from "./class.type";

export type StudentClass = {
  _id: string;
  userId: string;
  classes: ClassCardType[];
  createdAt: Date;
  updatedAt: Date;
};
