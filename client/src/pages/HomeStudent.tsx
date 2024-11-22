import React, { useState } from "react";
import "./../styles/HomeManager.css";
import logo from "../assets/adnu.svg";

// components
//import ProfessorNavbar from "../components/ProfessorNavbar";
import SubjectComponent from "../components/SubjectComponent";
import { useNavigate } from "react-router-dom";
import StudentNavbar from "../components/StudentNavbar";

const HomeManager: React.FC = () => {
  const navigate = useNavigate();

  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [classCards, setClassCards] = useState<
    {
      className: string;
      professor: string;
      scheduleDay: string;
      scheduleStart: string;
      scheduleEnd: string;
      theme: string;
    }[]
  >([]);

  const handleAddClassClick = () => {
    setIsOverlayActive(true);
  };

 // const handleCancelClick = () => {
  //  setIsOverlayActive(false);
 // };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const className = formData.get("className") as string;
    const professor = formData.get("professor") as string;
    const scheduleDay = formData.get("scheduleDay") as string;
    const scheduleStart = formData.get("scheduleStart") as string;
    const scheduleEnd = formData.get("scheduleEnd") as string;
    const selectedTheme = formData.get("theme") as string;

    const newClassCard = {
      className,
      professor,
      scheduleDay,
      scheduleStart,
      scheduleEnd,
      theme: getThemeColor(selectedTheme),
    };

    setClassCards((prev) => [...prev, newClassCard]);
    setIsOverlayActive(false);
    (e.target as HTMLFormElement).reset();
  };

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case "blue":
        return "#2e4c97";
      case "gray":
        return "#716d6d";
      case "black":
        return "#000000";
      case "purple":
        return "#4d009a";
      default:
        return "#2e4c97";
    }
  };

  return (
    <div className="nav-container">
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="nav-logo-wrapper">
            <img className="nav-logo" src={logo} alt="Logo" />
          </div>
          <ul className="nav-items">
            <a href="#home">Home</a>
            <a href="#calendar">Calendar</a>
            <a href="#settings">Settings</a>
            <a onClick={() => navigate("/")}>Log out</a>
            
          </ul>
        </div>
      </div>

      <div className="main-container">
        {/* Nav */}
        <StudentNavbar />

        <div className="buttons">
          <button id="addClassBtn" onClick={handleAddClassClick}>
            Join Class +
          </button>
        </div>
        <div className="subject-cards-wrapper">
          <SubjectComponent classCards={classCards} />
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
              <span style={{fontSize: '0.80rem'}}>You need to ask for your teacher the code to join the class</span>
              <input type="text" name="className" id="className" required placeholder="Code"/>

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

                <input type="radio" id="blackTheme" name="theme" value="black" />
                <label htmlFor="blackTheme" className="black"></label>

                <input type="radio" id="purpleTheme" name="theme" value="purple" />
                <label htmlFor="purpleTheme" className="purple"></label>
              </div>

     
              <button type="submit" className="create-btn">
                Join
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeManager;
