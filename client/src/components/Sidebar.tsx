import React from "react";
import logo from "../assets/adnu.svg";
import "./styles/sidebar.css";
import useLogout from "../hooks/useLogout";

const Sidebar: React.FC = () => {
  const { handleLogout } = useLogout();

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="nav-logo-wrapper">
          <img className="nav-logo" src={logo} alt="Logo" />
        </div>
        <ul className="nav-items">
          <a href="/manager-home">Home</a>
          <a href="/calendar-manager">Calendar</a>
          <a href="/settings-manager">Settings</a>
          <a href="/about-us-manager">About</a>
          {/* View and Read */}
          <a href="/archived-classes">Archived Classes</a>
          <a onClick={handleLogout}>Log out</a>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
