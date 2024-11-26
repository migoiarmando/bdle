import { USER_ROLES } from "../constants/UserRoles";

export type UserType = {
  _id: string;
  username: string;
  email: string;
  photoURL: string | null;
  role: USER_ROLES;
};
