import React, { useEffect, useState } from "react";
import "../../styles/HomeManager.css";
import SubjectComponent from "../../components/SubjectComponent";
//import { useNavigate } from "react-router-dom";
import userImage from "../../assets/user.svg";

import StudentSidebar from "../../components/StudentSidebar";
import { StudentClass } from "../../types/student-class.types";
import axiosClient from "../../utils/axios.utils";
import { toastError, toastSuccess } from "../../utils/toastEmitter";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { useSelector } from "react-redux";

const HomeManager: React.FC = () => {
  //const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  /** Fetch Student Class */
  const [studentClass, setStudentClass] = useState<StudentClass | null>(null);
  useEffect(() => {
    axiosClient
      .get("/student/class")
      .then(({ data }) => {
        setStudentClass(data);
      })
      .catch(({ response: { data } }) => {
        toastError(data.message);
      })
      .finally(() => {});
  }, []);

  const [isOverlayActive, setIsOverlayActive] = useState(false);

  const handleAddClassClick = () => {
    setIsOverlayActive(true);
  };

  const handleCancelClick = () => {
   setIsOverlayActive(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const handleOptionClick = (option: string) => {
    setIsDropdownOpen(false);
    switch (option) {
      case "Classes":
        // naviagate to classes
        break;
      case "Settings":
        // Navigate to Settings page
        break;
      case "Logout":
        // Logout
        break;
      default:
        break;
    }
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const classCode = formData.get("classCode") as string;
    axiosClient
      .post("/student/class", { classCode })
      .then(({ data }) => {
        toastSuccess(data.message);
        setStudentClass(data.studentClass);
      })
      .catch(({ response: { data } }) => {
        toastError(data.message);
      })
      .finally(() => {
        (e.target as HTMLFormElement).reset();
        setIsOverlayActive(false);
      });
  };

  return (
    <div className="nav-container">
      <StudentSidebar />

      <div className="main-container">
        {/* Nav */}
        <div className="nav-wrapper">
      <div className="welcome-wrapper">
        {/* add dynamic name and photo here */}
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
                    onClick={() => handleOptionClick("Classes")}
                  >
                    Classes
                  </div>
                  <div
                    className="dropdown-item"
                    onClick={() => handleOptionClick("Settings")}
                  >
                    Settings
                  </div>
                  <div
                    className="dropdown-item"
                    onClick={() => handleOptionClick("Logout")}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
      </div>
      <hr className="nav-hr" />
    </div>

        <div className="buttons">
          <button id="addClassBtn" onClick={handleAddClassClick}>
            Join Class +
          </button>
        </div>
        <div className="subject-cards-wrapper">
          <SubjectComponent
            classCards={studentClass ? studentClass.classes : []}
          />
        </div>
      </div>

      {/* Overlay */}
      {isOverlayActive && (
        <div id="overlay" className="overlay active">
          <div className="add-class-form-container">
            <div className="add-class-header">
              <h2>Join Class</h2>
            </div>

            <form id="createClassForm" onSubmit={handleFormSubmit}>
              <label htmlFor="className">Class code</label> <br />
              <span style={{ fontSize: "0.80rem" }}>
                You need to ask for your teacher the code to join the class
              </span>
              <input
                type="text"
                name="classCode"
                id="classCode"
                required
                placeholder="Code"
              />
              {/* <label>Theme</label> */}
              <div className="theme-picker">
                <input
                  type="radio"
                  id="blueTheme"
                  name="theme"
                  value="blue"
                  defaultChecked
                />
                <label htmlFor="blueTheme" className="blue"></label>

                <input type="radio" id="grayTheme" name="theme" value="gray" />
                <label htmlFor="grayTheme" className="gray"></label>

                <input
                  type="radio"
                  id="blackTheme"
                  name="theme"
                  value="black"
                />
                <label htmlFor="blackTheme" className="black"></label>

                <input
                  type="radio"
                  id="purpleTheme"
                  name="theme"
                  value="purple"
                />
                <label htmlFor="purpleTheme" className="purple"></label>
              </div>
              
              <button type="submit" className="create-btn">
                Join
              </button>
              <button
                type="button"
                className="cancel-btns"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeManager;
