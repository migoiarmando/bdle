import React from "react";
import { useNavigate } from "react-router-dom";
import { ClassCardType } from "../types/class.type";
import { convertTo12HourFormat } from "../utils/timeFormatter";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selector";
import { USER_ROLES } from "../constants/UserRoles";

const SubjectComponent: React.FC<{ classCards: ClassCardType[] }> = ({
  classCards,
}) => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const classOverviewUrl =
    currentUser?.role === USER_ROLES.Teacher
      ? "/class-overview"
      : "/class-overview-student";

  return (
    <div className="class-container">
      {classCards.map((classCard, index) => (
        <div
          key={index}
          className="class-card"
          style={{ backgroundColor: classCard.theme }}
          // Add backend here - navigate to specific class overview (must be different from prof and)
          onClick={() => navigate(`${classOverviewUrl}/${classCard._id}`)}
        >
          <div className="class-card-Subject">{classCard.className}</div>
          <div className="class-card-Time">
            {classCard.scheduleDay} -{" "}
            {convertTo12HourFormat(classCard.scheduleStart)} -{" "}
            {convertTo12HourFormat(classCard.scheduleEnd)}
          </div>
          <div className="class-card-Teacher">{classCard.section}</div>
        </div>
      ))}
    </div>
  );
};

export default SubjectComponent;
