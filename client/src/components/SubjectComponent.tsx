import React from "react";

interface ClassCardProps {
  className: string;
  professor: string;
  scheduleDay: string;
  scheduleStart: string;
  scheduleEnd: string;
  theme: string;
}

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
            {classCard.scheduleDay} - {classCard.scheduleStart} - {classCard.scheduleEnd}
          </div>
          <div className="class-card-Teacher">{classCard.professor}</div>
        </div>
      ))}
    </div>
  );
};

export default SubjectComponent;
