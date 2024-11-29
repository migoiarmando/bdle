import React from "react";
import logo from "../assets/adnu.svg";
import "./styles/sidebar.css";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const StudentSidebar: React.FC = () => {
  const navigate = useNavigate();

  const { handleLogout } = useLogout();

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="nav-logo-wrapper">
          <img className="nav-logo" src={logo} alt="Logo" />
        </div>
        <ul className="nav-items">
          <a onClick={() => navigate("/student-home")}>Home</a>
          <a onClick={() => navigate("/calendar-student")}>Calendar</a>
          <a onClick={() => navigate("/settings-student")}>Settings</a>
          <a onClick={() => navigate("/about-us")}>About</a>
          <a onClick={handleLogout}>Log out</a>
        </ul>
      </div>
    </div>
  );
};

export default StudentSidebar;
