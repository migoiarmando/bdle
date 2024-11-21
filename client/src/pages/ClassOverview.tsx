import React, { useEffect } from 'react';
import './../styles/ClassOverview.css';
import "./../styles/HomeManager.css";
import logo from "../assets/adnu.svg";

import ProfessorNavbar from "../components/ProfessorNavbar";


const AttendanceSubject: React.FC = () => {
  useEffect(() => {
    function updateTime() {
      const timeElement = document.getElementById('time') as HTMLElement;
      const dateElement = document.getElementById('date') as HTMLElement;
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12 || 12;  // Convert to 12-hour format
      timeElement.textContent = `${hours}:${minutes} ${ampm}`;

      const options = { month: 'long', day: 'numeric', year: 'numeric' };
    //   dateElement.textContent = now.toLocaleDateString('en-US', options);
    }

    setInterval(updateTime, 1000);
    updateTime();  // Initial call to display the time immediately
  }, []);

  return (
    <div className="nav-container">
      <div className="sidebar">
        <div>
          <div>
            <img className="logo" src="images/Ateneo_de_Naga_University_logo.png" alt="Logo" />
          </div>
          <ul className="nav-items">
            <a href="#">Home</a>
            <a href="#">Calendar</a>
            <a href="#">Settings</a>
          </ul>
        </div>
      </div>

      <div className="main-content">
      <ProfessorNavbar />
        <div className="top-container">
          <div className="left-container">
            <button className="back">
              <img className="back-logo" src="images/back.svg" />
              Back
            </button>
            <button className="create-attendance">Create Attendance</button>
            <button className="attendance-code">#attendance-Code</button>
          </div>
          <div className="circle">
            <div id="date">January 1, 2024</div>
            <div id="time">00:00 AM</div>
          </div>

          <div className="right-container">
            <div className="class-card">
              <div className="class-card-Subject">ITMC 113</div>
              <div className="class-card-Time">TTH 1:30PM - 3:00PM</div>
              <div className="class-card-Teacher">Kevin G. Vega</div>
            </div>

            <div className="attendance-record">
              <div className="present">
                <span className="status-label">Present</span>
                <div className="numbers">
                  <span>number</span>
                </div>
              </div>
              <div className="late">
                <span className="status-label">Absent</span>
                <div className="numbers">
                  <span>number</span>
                </div>
              </div>
              <div className="absent">
                <span className="status-label">Late</span>
                <div className="numbers">
                  <span>number</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Names</th>
              <th>IGN</th>
              <th>How are you?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Karl Axcel E. Lumabi</td>
              <td>Kaash</td>
              <td>Goods</td>
            </tr>
            <tr>
              <td>Karl Axcel E. Lumabi</td>
              <td>Kaash</td>
              <td>Goods</td>
            </tr>
            <tr>
              <td>Karl Axcel E. Lumabi</td>
              <td>kKaash</td>
              <td>Goods</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceSubject;
