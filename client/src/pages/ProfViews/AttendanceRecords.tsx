import React from "react";
import "../../styles/AttendanceRecords.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const AttendanceRecords: React.FC = () => {
  return (
    <div className="nav-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="top-container">
          <div className="top-left-container">
            <span className="attendance">Attendance</span>
            <div className="overall">
              <span>August</span>
            </div>
          </div>
          <div className="top-right-container">
            <div className="class-cards">
              <div className="class-card-Subjects">ITMC 113</div>
              <div className="class-card-Times">MW 1:30PM - 3:00PM</div>
              <div className="class-card-Teachers">Kevin G. Vega</div>
            </div>
          </div>
        </div>

        <div className="records-container">
          <table>
            <thead>
              <tr>
                <th>Names</th>
                <th>Gbox</th>
                <th>Aug 5</th>
                <th>Aug 7</th>
                <th>Aug 12</th>
                <th>Aug 14</th>
                <th>Aug 19</th>
                <th>Aug 21</th>
                <th>Aug 26</th>
                <th>Aug 28</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(4)].map((_, index) => (
                <tr key={index}>
                  <td>Karl Axcel E. Lumabi</td>
                  <td>klumabi@gbox.adnu.edu.ph</td>
                  <td className="present">P</td>
                  <td className="present">P</td>
                  <td className="late">L</td>
                  <td className="absent">A</td>
                  <td className="present">P</td>
                  <td className="present">P</td>
                  <td className="late">L</td>
                  <td className="present">P</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceRecords;
