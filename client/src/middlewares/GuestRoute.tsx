import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../redux/user/user.selector";
import { USER_ROLES } from "../constants/UserRoles";
import { FC, PropsWithChildren } from "react";

const GuestRoute: FC<PropsWithChildren> = ({ children }) => {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) return children;

  if (currentUser.role === USER_ROLES.Student)
    return <Navigate to="/student-home" />;

  if (currentUser.role === USER_ROLES.Teacher)
    return <Navigate to="/manager-home" />;
};

export default GuestRoute;
