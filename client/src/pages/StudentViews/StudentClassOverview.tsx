import React, { useEffect, useState } from "react";
import "../../styles/StudentClassOverview.css";
import back from "../../assets/back.svg";
import presentStudentsIcon from "../../assets/present-students-icon.svg";
import lateStudentsIcon from "../../assets/late-students-icon.svg";
import absentStudentsIcon from "../../assets/absent-students-icon.svg";

import Navbar from "../../components/Navbar";
import StudentSidebar from "../../components/StudentSidebar";

import { useNavigate, useParams } from "react-router-dom";
import { ClassCardType } from "../../types/class.type";
import axiosClient from "../../utils/axios.utils";
import { toastError, toastSuccess } from "../../utils/toastEmitter";
import { convertTo12HourFormat } from "../../utils/timeFormatter";
import { AttendanceType } from "../../types/attendance.type";
import { StudentAttendanceType } from "../../types/student-attendance.types";
import useAttendanceStatusCounter from "../../hooks/useAttendanceStatusCounter";
import useRealtimeClock from "../../hooks/useRealtimeClock";
import { indicator } from "../../utils/attendance-indicator";

const StudentClassOverview: React.FC = () => {
  const navigate = useNavigate();

  /** Date-Time */
  const { date, time, militaryTime } = useRealtimeClock();

  /** Fetch Selected Class */
  const { classId } = useParams();
  const [classCard, setClassCard] = useState<ClassCardType | null>(null);
  useEffect(() => {
    axiosClient
      .get(`/class/${classId}`)
      .then(({ data }) => {
        setClassCard(data);
      })
      .catch(({ response: { data } }) => {
        toastError(data.message);
      })
      .finally(() => {});
  }, [classId]);

  /** Fetch latest attendance */
  const [currentAttendance, setCurrentAttendance] =
    useState<AttendanceType | null>(null);
  useEffect(() => {
    axiosClient
      .get(`/attendance/latest/${classId}`)
      .then(({ data }) => {
        setCurrentAttendance(data);
      })
      .catch(({ response: { data } }) => {
        toastError(data.message);
      })
      .finally(() => {});
  }, [classId, setCurrentAttendance]);

  /** Fetch Student Attendances */
  const [studentAttendances, setStudentAttendances] = useState<
    StudentAttendanceType[] | []
  >([]);
  useEffect(() => {
    if (!currentAttendance) return;
    const fetchStudentAttendances = () => {
      axiosClient
        .get(`students/attendance/${currentAttendance._id}`)
        .then(({ data }) => {
          setStudentAttendances(data);
        })
        .catch(({ response: { data } }) => {
          toastError(data.message);
        })
        .finally(() => {});
    };

    setInterval(fetchStudentAttendances, 1000);
  }, [currentAttendance]);

  /** Fetch Current User Student Attendance */
  const [currentStudentAttendance, setCurrentStudentAttendance] =
    useState<StudentAttendanceType | null>(null);
  useEffect(() => {
    if (!currentAttendance) return;
    axiosClient
      .get(`/student/attendance/${currentAttendance._id}`)
      .then(({ data }) => {
        setCurrentStudentAttendance(data);
      })
      .catch(({ response: { data } }) => {
        toastError(data.message);
      })
      .finally(() => {});
  }, [currentAttendance, setCurrentStudentAttendance]);

  /** Join Attendance */
  const [isAddingAttendance, setIsAddingAttendance] = useState(false);
  const [attendanceCode, setAttendanceCode] = useState("");
  const [studentIGN, setStudentIGN] = useState("");
  const [answerOfTheDay, setAnswerOfTheDay] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleCreateAttendanceClick = () => {
    setIsAddingAttendance(true);
  };
  const handleCancelClick = () => {
    setIsAddingAttendance(false);
    resetFields();
  };
  const resetFields = () => {
    setAttendanceCode("");
    setAnswerOfTheDay("");
  };
  const handleSubmit = async () => {
    // Check if any required field is empty
    if (!attendanceCode || !studentIGN || !answerOfTheDay) {
      toastError("Please fill in all the required fields.");
      return;
    }

    setIsSubmitting(true);
    const studentAttendance = {
      attendanceCode,
      studentIGN,
      answerOfTheDay,
      timeIn: militaryTime,
    };
    axiosClient
      .post(`/student/attendance/${classId}`, studentAttendance)
      .then(({ data }) => {
        toastSuccess(data.message);
        setCurrentStudentAttendance(data.studentAttendance);
        setStudentAttendances([...studentAttendances, data.studentAttendance]);
        setIsAddingAttendance(false);
        resetFields();
      })
      .catch(({ response: { data } }) => {
        toastError(data.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  /** Attendances */
  const { presentCount, lateCount, absentCount } = useAttendanceStatusCounter({
    studentAttendances,
  });

  return (
    classCard && (
      <div className="nav-container">
          <StudentSidebar />
        <div className="main-content">
          <Navbar />
          <div className="top-container">
            <div className="left-container">
              <button
                className="back"
                onClick={() => navigate("/student-home")}
              >
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
              <div className="attendance-code">
                <strong>Attendance Code:</strong> {currentStudentAttendance?.attendanceCode ?? ""}
              </div>
            </div>
            <div className="circle">
              <div id="date">{date}</div>
              <div id="time">{time}</div>
            </div>

            <div className="right-container">
              <div className="class-card-wrapper">
                <div className="class-card-Subject">{classCard.className}</div>
                <div className="class-card-Time">
                  {classCard.scheduleDay}{" "}
                  {convertTo12HourFormat(classCard.scheduleStart)} -{" "}
                  {convertTo12HourFormat(classCard.scheduleEnd)}
                </div>
                <div className="class-card-Teacher-wrapper">
                  {classCard.section}
                </div>
              </div>

              <div className="attendance-record">
                <div className="present-wrapper">
                  <span className="status-label">Present</span>
                  <div className="numbers">
                    <img src={presentStudentsIcon} alt="" />
                    <span>{presentCount}</span>
                  </div>
                </div>
                <div className="late-wrapper">
                  <span className="status-label">Late</span>
                  <div className="numbers">
                    <img src={lateStudentsIcon} alt="" />
                    <span>{lateCount}</span>
                  </div>
                </div>
                <div className="absent-wrapper">
                  <span className="status-label">Absent</span>
                  <div className="numbers">
                    <img src={absentStudentsIcon} alt="" />
                    <span>{absentCount}</span>
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
                  <label>IGN:</label>
                  <input
                    type="text"
                    value={studentIGN}
                    onChange={(e) => setStudentIGN(e.target.value)}
                    placeholder="Enter attendance code"
                  />
                </div>
                <div className="form-group">
                  <label>Question of the Day:</label>
                  {/* BACKEND Add dynamic question here */}
                  <span>{currentAttendance?.questionOfTheDay}</span>
                  <textarea
                    value={answerOfTheDay}
                    onChange={(e) => setAnswerOfTheDay(e.target.value)}
                    placeholder="Enter answer"
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
        <div className="table-container">
          <table>
              <thead>
                <tr>
                  <th>Names</th>
                  <th>IGN</th>
                  {/* BACKEND Add dynamic question of the day here */}
                  <th>{currentAttendance?.questionOfTheDay}</th>
                </tr>
              </thead>
              <tbody>
                {studentAttendances
                  //.filter((attendance) => attendance.status !== "Absent")
                  .map((studentAttendance) => (
                    <tr key={studentAttendance._id}>
                      <td className="student-name-wrapper">
                        <img src={indicator(studentAttendance)} alt="" />
                        {studentAttendance.userId.username}
                      </td>
                      <td>{studentAttendance.studentIGN}</td>
                      <td>{studentAttendance.answerOfTheDay}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
        </div>
          
        </div>
      </div>
    )
  );
};

export default StudentClassOverview;
