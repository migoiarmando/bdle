import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../redux/user/user.selector";
import { USER_ROLES } from "../constants/UserRoles";
import { FC, PropsWithChildren } from "react";

const TeacherRoute: FC<PropsWithChildren> = ({ children }) => {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) return <Navigate to="/" />;

  if (currentUser.role === USER_ROLES.Student)
    return <Navigate to="/student-home" />;

  return children;
};

export default TeacherRoute;
