import React, { useState } from 'react';
import '../../styles/Calendar.css';

import StudentSidebar from '../../components/StudentSidebar';
import StudentNavbar from '../../components/StudentNavbar';

import DownLine from "../../assets/down-line.svg";

const Calendar = () => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("ITMC211"); //Add dynamic class here

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const today = new Date();

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

  const updateMonth = (offset: number) => {
    const newDate = new Date(currentYear, currentMonth + offset);
    setCurrentDate(newDate);
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
        <div
          key={`day-${index}`}
          className={`day ${isToday ? 'today' : ''}`}
        >
          {day}
        </div>
      );
    });

    return [...blankDays, ...days];
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleItemClick = (item: React.SetStateAction<string>) => {
    setSelectedClass(item);
    setIsDropdownOpen(false); // Close dropdown after selection
  };
  return (
    <div className="nav-container">
      <StudentSidebar />

      <div className="main-container">
        <StudentNavbar />

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
                  <img
                    src={DownLine}
                    alt="Toggle Dropdown"

                  />
                </div>

                {isDropdownOpen && (
                  <div className="dropdown-content">
                    {["ITMC211", "ITMC212", "ITMC213"].map((item) => (
                      <div
                        key={item}
                        className="dropdown-item"
                        onClick={() => handleItemClick(item)}
                      >
                        {item}
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
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="day-header">{day}</div>
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
