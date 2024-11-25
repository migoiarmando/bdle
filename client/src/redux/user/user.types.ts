import { USER_ROLES } from "../../constants/UserRoles";

export type initialUserStateType = {
  readonly currentUser: currentUserType | null;
};

export type currentUserType = {
  _id: string;
  username: string;
  email: string;
  photoURL: string | null;
  role: USER_ROLES;
};
