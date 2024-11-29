import React, { useEffect, useState } from "react";
import "../../styles/Calendar.css";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import DownLine from "../../assets/down-line.svg";
import { ClassCardType } from "../../types/class.type";
import axiosClient from "../../utils/axios.utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { toastError } from "../../utils/toastEmitter";
import { AttendanceType } from "../../types/attendance.type";

const Calendar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");

  /** Fetch Classes */
  const [classCards, setClassCards] = useState<ClassCardType[]>([]);
  useEffect(() => {
    axiosClient
      .get(`/classes/${currentUser?._id}`)
      .then(({ data }) => {
        setClassCards(data);
        if (data.length > 0) {
          setSelectedClass(data[0].className);
          setSelectedClassId(data[0]._id);
        }
      })
      .catch(({ response: { data } }) => {
        toastError(data.message);
      })
      .finally(() => {});
  }, [setClassCards, currentUser]);

  /** Fetch attendances */
  const [attendances, setAttendances] = useState<AttendanceType[] | []>([]);
  useEffect(() => {
    if (!selectedClassId) return;
    axiosClient
      .get(`/attendances/${selectedClassId}`)
      .then(({ data }) => {
        setAttendances(data);
      })
      .catch(({ response: { data } }) => {
        toastError(data.message);
      })
      .finally(() => {});
  }, [selectedClassId]);

  /** Select Class */
  const handleItemClick = (item: React.SetStateAction<string>) => {
    setSelectedClassId(item);
    const selectedClass = classCards?.find(
      (classItem) => classItem._id === item
    );
    setSelectedClass(selectedClass!.className);
    setIsDropdownOpen(false);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  /** Calendar */
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const today = new Date();

  const getDaysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();

  const updateMonth = (offset: number) => {
    const newDate = new Date(currentYear, currentMonth + offset);
    setCurrentDate(newDate);
  };

  const displayAttendance = (day: number) => {
    const _currentMonth = currentDate.getMonth();
    const _currentYear = currentDate.getFullYear();

    if (attendances.length === 0) return day;
    const attendancesToDisplay = attendances?.filter(
      (attendance) =>
        new Date(attendance.createdAt).getDate() == day &&
        new Date(attendance.createdAt).getMonth() === _currentMonth &&
        new Date(attendance.createdAt).getFullYear() === _currentYear
    );

    if (attendancesToDisplay.length > 0) {
      return (
        <>
          <div>{day}</div>
          {attendancesToDisplay.map((att) => (
            <a
              key={att._id}
              style={{ display: "block" }}
              href={`/specific-date-manager/${att._id}`}
            >
              <strong>{att.attendanceCode}</strong>
            </a>
          ))}
        </>
      );
    }

    return day;
  };

  const renderCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);

    const blankDays = Array.from({ length: firstDay }, (_, index) => (
      <div key={`blank-${index}`} className="day"></div>
    ));

    const days = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentMonth &&
        today.getFullYear() === currentYear;

      return (
        <div key={`day-${index}`} className={`day ${isToday ? "today" : ""}`}>
          {displayAttendance(day)}
        </div>
      );
    });

    return [...blankDays, ...days];
  };

  return (
    <div className="nav-container">
      <Sidebar />

      <div className="main-container">
        <Navbar />

        <div className="main-calendar">
          <div className="date-container">
            <div className="date">
              <h2>{`${monthNames[currentMonth]}, ${currentYear}`}</h2>
            </div>
            <div className="date-navigation">
              {/* Dropdown Container */}
              <div className="dropdown-container" onClick={toggleDropdown}>
                <div className="dropdown-header">
                  <span>{selectedClass}</span> {/* Display selected item */}
                  <img src={DownLine} alt="Toggle Dropdown" />
                </div>

                {isDropdownOpen && (
                  <div className="dropdown-content">
                    {classCards.map((item) => (
                      <div
                        key={item._id}
                        className="dropdown-item"
                        onClick={() => handleItemClick(item._id)}
                      >
                        {item.className}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={() => updateMonth(-1)}>&lt;</button>
              <button onClick={() => updateMonth(1)}>&gt;</button>
            </div>
          </div>

          <div className="calendar">
            {/* Day Headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="day-header">
                {day}
              </div>
            ))}
            {/* Days */}
            {renderCalendarDays()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
