import { AttendanceType } from "../types/attendance.type";
import { StudentAttendanceType } from "../types/student-attendance.types";
import { indicator } from "../utils/attendance-indicator";

type StudentAttendanceTableProps = {
  currentAttendance: AttendanceType | null;
  studentAttendances: StudentAttendanceType[] | [];
};

const StudentAttendanceTable: React.FC<StudentAttendanceTableProps> = ({
  currentAttendance,
  studentAttendances,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Names</th>
          <th>IGN</th>
          <th>{currentAttendance ? currentAttendance.questionOfTheDay : ""}</th>
        </tr>
      </thead>
      <tbody>
        {/* BACKEND Add dynamic content here - studentsd */}
        {studentAttendances.map((studentAttendance) => (
          <tr key={studentAttendance._id}>
            <td className="student-name-wrapper">
              <img src={indicator(studentAttendance)} alt="" />
              {studentAttendance.userId.username}
            </td>
            <td>{studentAttendance.userId.username}</td>
            <td>{studentAttendance.answerOfTheDay}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentAttendanceTable;
