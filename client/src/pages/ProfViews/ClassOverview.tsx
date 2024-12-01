import React, { useEffect, useState } from "react";
import "../../styles/ClassOverview.css";
import back from "../../assets/back.svg";
import presentStudentsIcon from "../../assets/present-students-icon.svg";
import lateStudentsIcon from "../../assets/late-students-icon.svg";
import absentStudentsIcon from "../../assets/absent-students-icon.svg";
import Sidebar from "../../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";

import { ClassCardType } from "../../types/class.type";
import axiosClient from "../../utils/axios.utils";
import { toastError, toastSuccess } from "../../utils/toastEmitter";
import { convertTo12HourFormat } from "../../utils/timeFormatter";
import { AttendanceType } from "../../types/attendance.type";
import { StudentAttendanceType } from "../../types/student-attendance.types";
import useAttendanceStatusCounter from "../../hooks/useAttendanceStatusCounter";
import useRealtimeClock from "../../hooks/useRealtimeClock";
import StudentAttendanceTable from "../../components/StudentAttendanceTable";
import Navbar from "../../components/Navbar";

const AttendanceSubject: React.FC = () => {
  const navigate = useNavigate();

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

  /** Create Attendance */
  const [isAddingAttendance, setIsAddingAttendance] = useState(false);
  const [attendanceCode, setAttendanceCode] = useState("");
  const [questionOfTheDay, setQuestionOfTheDay] = useState("");
  const handleSubmit = () => {
    if (!attendanceCode || !questionOfTheDay) {
      toastError("Please fill in all fields.");
      return;
    }

    const newAttendance = { attendanceCode, questionOfTheDay };
    axiosClient
      .post(`/attendance/${classCard?._id}`, newAttendance)
      .then(({ data }) => {
        toastSuccess(data.message);
        setCurrentAttendance(data.attendance);
        window.location.reload();
      })
      .catch(({ response: { data } }) => {
        toastError(data.message);
      })
      .finally(() => {
        setIsAddingAttendance(false);
        resetFields();
      });
  };
  const handleCreateAttendanceClick = () => {
    setIsAddingAttendance(true);
  };
  const handleCancelClick = () => {
    setIsAddingAttendance(false);
    resetFields();
  };
  const resetFields = () => {
    setAttendanceCode("");
    setQuestionOfTheDay("");
  };

  /** Attendances */
  const { presentCount, lateCount, absentCount } = useAttendanceStatusCounter({
    studentAttendances,
  });

  /** Date-Time */
  const { date, time } = useRealtimeClock();

  return (
    classCard && (
      <div className="nav-container">
        <Sidebar />

        <div className="main-content">
          <Navbar />
          <div className="top-container">
            <div className="left-container">
              <button
                className="back"
                onClick={() => navigate("/manager-home")}
              >
                <img className="back-logo" src={back} alt="Back" />
                Back
              </button>
              <button
                className="create-attendance"
                onClick={handleCreateAttendanceClick}
              >
                Create Attendance
              </button>
              {/* Add attendance code here */}
              <div className="attendance-code">
                #{currentAttendance ? currentAttendance.attendanceCode : ""}
              </div>
              <div className="attendance-code">#{classCard.classCode}</div>
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
                  <span className="status-label">Absent</span>
                  <div className="numbers">
                    <img src={absentStudentsIcon} alt="" />
                    <span>{absentCount}</span>
                  </div>
                </div>
                <div className="absent-wrapper">
                  <span className="status-label">Late</span>
                  <div className="numbers">
                    <img src={lateStudentsIcon} alt="" />
                    <span>{lateCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Overlay */}
          {isAddingAttendance && (
            <div className="overlay">
              <div className="attendance-form">
                <h2>Create Attendance</h2>
                <span className="attendance-form-span">
                  create a code for student to access attendance
                </span>
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
                  <textarea
                    value={questionOfTheDay}
                    onChange={(e) => setQuestionOfTheDay(e.target.value)}
                    placeholder="Enter question of the day"
                  />
                </div>
                <div className="form-buttons">
                  <button className="submit-button" onClick={handleSubmit}>
                    Create Attendance
                  </button>
                  <button className="cancel-button" onClick={handleCancelClick}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <StudentAttendanceTable
            currentAttendance={currentAttendance}
            studentAttendances={studentAttendances}
          />
        </div>
      </div>
    )
  );
};

export default AttendanceSubject;
