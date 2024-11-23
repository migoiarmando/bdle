import React, { useState } from "react";
import "./../styles/HomeManager.css";
//import logo from "../assets/adnu.svg";

// components
import ProfessorNavbar from "../components/ProfessorNavbar";
import SubjectComponent from "../components/SubjectComponent";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const HomeManager: React.FC = () => {
  //const navigate = useNavigate();

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

  const handleCancelClick = () => {
    setIsOverlayActive(false);
  };

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
      <Sidebar />

      <div className="main-container">
        {/* Nav */}
        <ProfessorNavbar />

        <div className="buttons">
          <button id="addClassBtn" onClick={handleAddClassClick}>
            Add Class +
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
              <h2>Add Class</h2>
            </div>
            
            <form id="createClassForm" onSubmit={handleFormSubmit}>
              <label htmlFor="className">Class name</label>
              <input type="text" name="className" id="className" required />

              <label htmlFor="professor">Professor</label>
              <input type="text" name="professor" id="professor" required />

              <label htmlFor="scheduleDay">Class Sched (Day)</label>
              <input type="text" name="scheduleDay" id="scheduleDay" required />

              <label htmlFor="scheduleStart">Start Time</label>
              <input type="time" name="scheduleStart" id="scheduleStart" required />

              <label htmlFor="scheduleEnd">End Time</label>
              <input type="time" name="scheduleEnd" id="scheduleEnd" required />

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

              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
              <button type="submit" className="create-btn">
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeManager;
