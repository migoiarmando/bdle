import React from "react";
import logo from "../assets/adnu.svg";
import "./styles/sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="nav-logo-wrapper">
          <img className="nav-logo" src={logo} alt="Logo" />
        </div>
        <ul className="nav-items">
          <a onClick={() => navigate("/manager-home")}>Home</a>
          <a onClick={() => navigate("/calendar-manager")}>Calendar</a>
          <a onClick={() => navigate("/404")}>Settings</a>
          <a onClick={() => navigate("/login")}>Log out</a>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
