import React, { useEffect, useState } from "react";
import "../../styles/SpecificDate.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { StudentAttendanceType } from "../../types/student-attendance.types";
import { AttendanceType } from "../../types/attendance.type";
import axiosClient from "../../utils/axios.utils";
import { toastError } from "../../utils/toastEmitter";
import { useParams } from "react-router-dom";
import DateCard from "../../components/DateCard";
import ClassCard from "../../components/ClassCard";
import StudentAttendanceTable from "../../components/StudentAttendanceTable";

const SpecificDateStudent: React.FC = () => {
  const { attendanceId } = useParams();
  /** Fetch Attendance By Id */
  const [currentAttendance, setCurrentAttendance] =
    useState<AttendanceType | null>(null);
  useEffect(() => {
    axiosClient
      .get(`/attendance/${attendanceId}`)
      .then(({ data }) => {
        setCurrentAttendance(data);
      })
      .catch(({ response: { data } }) => {
        toastError(data.message);
      })
      .finally(() => {});
  }, [attendanceId, setCurrentAttendance]);

  /** Fetch Student Attendances */
  const [studentAttendances, setStudentAttendances] = useState<
    StudentAttendanceType[] | []
  >([]);
  useEffect(() => {
    if (!currentAttendance) return;
    axiosClient
      .get(`students/attendance/${currentAttendance._id}`)
      .then(({ data }) => {
        setStudentAttendances(data);
      })
      .catch(({ response: { data } }) => {
        toastError(data.message);
      })
      .finally(() => {});
  }, [currentAttendance]);

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const standardHour = hour % 12 || 12; // Convert 0 to 12
    return `${standardHour}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <div className="nav-container">
      <Sidebar />
      <div className="main-container">
        <Navbar />

        <div className="container-subject">
          <DateCard
            date={currentAttendance ? currentAttendance.createdAt : new Date()}
          />
          <div className="subject">
            <ClassCard
              subject={currentAttendance?.classId.className ?? ""}
              time={
                currentAttendance
                  ? `${currentAttendance.classId.scheduleDay} ${formatTime(currentAttendance.classId.scheduleStart)}-${formatTime(currentAttendance.classId.scheduleEnd)}`
                  : "TTH 1:30PM - 3:00PM"
              }
              section={currentAttendance?.classId.section ?? ""}
            />
          </div>
        </div>
        <StudentAttendanceTable
          currentAttendance={currentAttendance}
          studentAttendances={studentAttendances
            .map((studentAttendance) => ({
              ...studentAttendance,
              studentName: studentAttendance.userId.username,
            }))
            .sort((a, b) => a.studentName.localeCompare(b.studentName))}
        />
      </div>
    </div>
  );
};

export default SpecificDateStudent;
