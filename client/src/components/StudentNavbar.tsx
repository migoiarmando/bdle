import React from "react";
import userImage from "../assets/user.svg";
import "./styles/subjectComponent.css";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selector";

const StudentNavbar: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <div className="nav-wrapper">
      <div className="welcome-wrapper">
        {/* add dynamic name and photo here */}
        <span>
          Welcome,&nbsp;
          <strong>{currentUser?.username}</strong>
        </span>
        <img
          className="user-img"
          src={currentUser?.photoURL ?? userImage}
          alt="User"
        />
      </div>
      <hr className="nav-hr" />
    </div>
  );
};

export default StudentNavbar;
