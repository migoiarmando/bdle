import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { USER_ROLES } from "../constants/UserRoles";
import useLogout from "../hooks/useLogout";

type NavbarDropdownProps = {
  role: string;
  isDropdownOpen: boolean;
};

enum STUDENT_ROUTES {
  classes = "/student-home",
  settings = "/settings-student",
}

enum TEACHER_ROUTES {
  classes = "/manager-home",
  settings = "/settings-manager",
}

const NavbarDropdown: FC<NavbarDropdownProps> = ({ role, isDropdownOpen }) => {
  const navigate = useNavigate();

  const { handleLogout } = useLogout();

  const handleRouting = useCallback(
    (routeTo: keyof typeof STUDENT_ROUTES | keyof typeof TEACHER_ROUTES) => {
      const ROUTES =
        role === USER_ROLES.Teacher ? TEACHER_ROUTES : STUDENT_ROUTES;
      navigate(ROUTES[routeTo]);
    },
    [navigate, role]
  );

  return (
    isDropdownOpen && (
      <div className="dropdown-menu show">
        <div
          className="dropdown-item"
          id="classes"
          onClick={() => handleRouting("classes")}
        >
          Classes
        </div>
        <div
          className="dropdown-item"
          id="settings"
          onClick={() => handleRouting("settings")}
        >
          Settings
        </div>
        <div className="dropdown-item" id="logout" onClick={handleLogout}>
          Logout
        </div>
      </div>
    )
  );
};

export default NavbarDropdown;
