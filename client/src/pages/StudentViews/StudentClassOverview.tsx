import React, { useEffect, useState } from "react";
import "../../styles/StudentClassOverview.css";
import back from "../../assets/back.svg";
import presentStudentsIcon from "../../assets/present-students-icon.svg";
import lateStudentsIcon from "../../assets/late-students-icon.svg";
import absentStudentsIcon from "../../assets/absent-students-icon.svg";

import presentCircle from "../../assets/student-status/present-circle-icon.svg";
// import lateCircle from "../../assets/student-status/late-circle-icon.svg";
// import absentCircle from "../../assets/student-status/absent-circle-icon.svg";


import StudentNavbar from "../../components/StudentNavbar";
import StudentSidebar from "../../components/StudentSidebar";

//import axios from "axios"; // Import axios for backend requests
import { useNavigate } from "react-router-dom";

const StudentClassOverview: React.FC = () => {
  const [isAddingAttendance, setIsAddingAttendance] = useState(false);
  const [attendanceCode, setAttendanceCode] = useState("");
  const [questionOfTheDay, setQuestionOfTheDay] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle submission state
  const navigate = useNavigate();

  useEffect(() => {
    function updateTime() {
      const timeElement = document.getElementById("time") as HTMLElement;
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12 || 12; // Convert to 12-hour format
      timeElement.textContent = `${hours}:${minutes} ${ampm}`;
    }

    setInterval(updateTime, 1000);
    updateTime(); // Initial call to display the time immediately
  }, []);

  const handleCreateAttendanceClick = () => {
    setIsAddingAttendance(true);
  };

  const handleCancelClick = () => {
    setIsAddingAttendance(false);
    resetFields();
  };

  const handleSubmit = async () => {
    if (attendanceCode.trim() && questionOfTheDay.trim()) {
      try {
        setIsSubmitting(true);

        // Replace with actual student ID (e.g., from auth)
        //const studentId = "student-id-here";

        // Send data to the backend
        // const response = await axios.post("/api/join-attendance", {
        //   attendanceCode,
        //   questionOfTheDay,
        //   studentId,
        // });

        // Handle success response
        alert("Attendance created successfully!");
        setIsAddingAttendance(false);
        resetFields();
      } catch (error) {
        console.error("Error joining attendance:", error);
        alert("There was an error joining attendance. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  const resetFields = () => {
    setAttendanceCode("");
    setQuestionOfTheDay("");
  };

  return (
    <div className="nav-container">
      <StudentSidebar />

      <div className="main-content">
        <StudentNavbar />
        <div className="top-container">
          <div className="left-container">
            <button className="back"
              onClick={() => navigate("/student-home")}>
              <img className="back-logo" src={back} alt="Back" />
              Back
            </button>
            <button
              className="create-attendance"
              onClick={handleCreateAttendanceClick}
            >
              Join Attendance
            </button>
            {/* BACKEND Add dynamic attendance code here */}
            <div className="attendance-code">#attendance-Code</div>
          </div>
          <div className="circle">
            <div id="date">January 1, 2024</div>
            <div id="time">00:00 AM</div>
          </div>

          <div className="right-container">
            <div className="class-card-wrapper">
              <div className="class-card-Subject">ITMC 113</div>
              <div className="class-card-Time">TTH 1:30PM - 3:00PM</div>
              <div className="class-card-Teacher-wrapper">Kevin G. Vega</div>
            </div>

            <div className="attendance-record">
              <div className="present-wrapper">
                <span className="status-label">Present</span>
                <div className="numbers">
                  <img src={presentStudentsIcon} alt="" />
                  <span>0</span>
                </div>
              </div>
              <div className="late-wrapper">
                <span className="status-label">Absent</span>
                <div className="numbers">
                  <img src={absentStudentsIcon} alt="" />
                  <span>0</span>
                </div>
              </div>
              <div className="absent-wrapper">
                <span className="status-label">Late</span>
                <div className="numbers">
                  <img src={lateStudentsIcon} alt="" />
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Overlay */}
        {isAddingAttendance && (
          <div className="overlay">
            <div className="attendance-form">
              <h2>Join Attendance</h2>
              <div className="form-group">
                <label>Attendance Code:</label>
                <input
                  type="text"
                  value={attendanceCode}
                  onChange={(e) => setAttendanceCode(e.target.value)}
                  placeholder="Enter attendance code"
                />
              </div>
              <div className="form-group">
                <label>Question of the Day:</label>
                {/* BACKEND Add dynamic question here */}
                <span>How are you?</span>
                <textarea
                  value={questionOfTheDay}
                  onChange={(e) => setQuestionOfTheDay(e.target.value)}
                  placeholder="Enter question of the day"
                />
              </div>
              <div className="form-buttons">
                <button
                  className="submit-button"
                  onClick={handleSubmit}
                  disabled={isSubmitting} // Disable button while submitting
                >
                  {isSubmitting ? "Submitting..." : "Join Attendance"}
                </button>
                <button className="cancel-button" onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Names</th>
              <th>IGN</th>
              {/* BACKEND Add dynamic question of the day here */}
              <th>How are you?</th>
            </tr>
          </thead>
          <tbody>
            {/* BACKEND Add dynamic content here - studentsd */}
            <tr>
              <td className="student-name-wrapper">
                <img src={presentCircle} alt="" />
                Karl Axcel E. Lumabi
              </td>
              <td>Kaash</td>
              <td>Goods</td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentClassOverview;
