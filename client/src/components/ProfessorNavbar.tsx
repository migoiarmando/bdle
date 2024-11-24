import React from 'react'
import userImage from "../assets/user.svg";
import "./styles/subjectComponent.css";

const ProfessorNavbar: React.FC = () => {
  return (
    <div className="nav-wrapper">
          <div className="welcome-wrapper">
            {/* add dynamic name and photo here */}
            <span>Welcome, Professor </span>
            <img className="user-img" src={userImage} alt="User" />
          </div>
          <hr  className="nav-hr"/>
    </div>
  )
}

export default ProfessorNavbar