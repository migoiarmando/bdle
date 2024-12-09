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
    <div className="table-container">
      <table>
          <thead>
            <tr>
              <th>Names</th>
              <th>IGN</th>
              <th>{currentAttendance ? currentAttendance.questionOfTheDay : ""}</th>
            </tr>
          </thead>
          <tbody>
            {/* BACKEND Add dynamic content here - students */}
            {studentAttendances.map((studentAttendance) => (
              <tr key={studentAttendance._id}>
                <td className="student-name-wrapper">
                  <img src={indicator(studentAttendance)} alt="" />
                  Confidential
                  </td>
                <td>{studentAttendance.studentIGN}</td>
                <td>{studentAttendance.answerOfTheDay}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    
  );
};

export default StudentAttendanceTable;
