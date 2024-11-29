import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selector";
import { useCallback, useState } from "react";
import userImage from "../assets/user.svg";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { USER_ROLES } from "../constants/UserRoles";

enum STUDENT_ROUTES {
  classes = "/student-home",
  settings = "/settings-student",
}

enum TEACHER_ROUTES {
  classes = "/manager-home",
  settings = "/settings-manager",
}

const Navbar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const { handleLogout } = useLogout();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleRouting = useCallback(
    (routeTo: keyof typeof STUDENT_ROUTES | keyof typeof TEACHER_ROUTES) => {
      const ROUTES =
        currentUser!.role === USER_ROLES.Teacher
          ? TEACHER_ROUTES
          : STUDENT_ROUTES;
      navigate(ROUTES[routeTo]);
    },
    [navigate, currentUser]
  );

  return (
    <div className="nav-wrapper">
      <div className="welcome-wrapper">
        <span>
          Welcome,&nbsp;
          <strong>{currentUser?.username}</strong>
        </span>
        <div className="user-img-container" onClick={toggleDropdown}>
          <img
            className="user-img"
            src={currentUser?.photoURL ?? userImage}
            alt="User"
          />
          {isDropdownOpen && (
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
          )}
        </div>
      </div>
      <hr className="nav-hr" />
    </div>
  );
};

export default Navbar;
