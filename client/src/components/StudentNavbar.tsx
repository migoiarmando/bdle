import React from 'react'
import userImage from "../assets/user.svg";
import "./styles/subjectComponent.css";

const StudentNavbar: React.FC = () => {
  return (
    <div className="nav-wrapper">
          <div className="welcome-wrapper">
        {/* add dynamic name here */}

            <span>Welcome, Student </span>
            <img className="user-img" src={userImage} alt="User" />
          </div>
          <hr  className="nav-hr"/>
    </div>
  )
}

export default StudentNavbar