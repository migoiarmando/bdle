import React from "react";

interface ClassCardProps {
  className: string;
  professor: string;
  scheduleDay: string;
  scheduleStart: string;
  scheduleEnd: string;
  theme: string;
}

const convertTo12HourFormat = (time: string) => {
  const [hour, minute] = time.split(':').map(Number);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const adjustedHour = hour % 12 || 12; 
  return `${adjustedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
};

const SubjectComponent: React.FC<{ classCards: ClassCardProps[] }> = ({ classCards }) => {
  return (
    <div className="class-container">
      {classCards.map((classCard, index) => (
        <div
          key={index}
          className="class-card"
          style={{ backgroundColor: classCard.theme }}
        >
          <div className="class-card-Subject">{classCard.className}</div>
          <div className="class-card-Time">
            {classCard.scheduleDay} - {convertTo12HourFormat(classCard.scheduleStart)} - {convertTo12HourFormat(classCard.scheduleEnd)}
          </div>
          <div className="class-card-Teacher">{classCard.professor}</div>
        </div>
      ))}
    </div>
  );
};

export default SubjectComponent;
