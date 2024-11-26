import React, { useEffect, useState } from "react";
import "../../styles/HomeManager.css";

// components
import ProfessorNavbar from "../../components/ProfessorNavbar";
import SubjectComponent from "../../components/SubjectComponent";
//import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import axiosClient from "../../utils/axios.utils";
import { toastError, toastSuccess } from "../../utils/toastEmitter";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { ClassCardType } from "../../types/class.type";

const HomeManager: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);

  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [classCards, setClassCards] = useState<ClassCardType[]>([]);

  useEffect(() => {
    axiosClient
      .get(`/classes/${currentUser?._id}`)
      .then(({ data }) => {
        setClassCards(data);
      })
      .catch(({ response: { data } }) => {
        toastError(data.message);
      })
      .finally(() => {});
  }, [setClassCards, currentUser]);

  const handleAddClassClick = () => {
    setIsOverlayActive(true);
    setGeneratedCode(generateUniqueClassCode()); // Generate code when overlay is activated
  };

  const handleCancelClick = () => {
    setIsOverlayActive(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const className = formData.get("className") as string;
    const section = formData.get("section") as string;
    const scheduleDay = formData.get("scheduleDay") as string;
    const scheduleStart = formData.get("scheduleStart") as string;
    const scheduleEnd = formData.get("scheduleEnd") as string;
    const selectedTheme = formData.get("theme") as string;

    const newClassCard = {
      className,
      section,
      scheduleDay,
      scheduleStart,
      scheduleEnd,
      theme: getThemeColor(selectedTheme),
      classCode: generatedCode,
    };

    axiosClient
      .post("/class", newClassCard)
      .then(({ data }) => {
        setClassCards([...classCards, data.class]);
        toastSuccess(data.message);
      })
      .catch(({ response: { data } }) => {
        toastError(data.message);
      })
      .finally(() => {});

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

  const generateUniqueClassCode = (): string => {
    // Generate a random alphanumeric string (6 characters long)
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
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

              <label htmlFor="section">Section</label>
              <input type="text" name="section" id="section" required />

              <label htmlFor="scheduleDay">Class Sched (Day)</label>
              <input type="text" name="scheduleDay" id="scheduleDay" required />

              <label htmlFor="scheduleStart">Start Time</label>
              <input
                type="time"
                name="scheduleStart"
                id="scheduleStart"
                required
              />

              <label htmlFor="scheduleEnd">End Time</label>
              <input type="time" name="scheduleEnd" id="scheduleEnd" required />

              <label htmlFor="classCode">Class Code</label>

              <input
                type="text"
                name="classCode"
                id="classCode"
                value={generatedCode}
                readOnly
                required
              />
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(generatedCode)}
                className="copy-btn"
              >
                Copy Code
              </button>

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
