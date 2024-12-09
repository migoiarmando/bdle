import React, { useEffect, useState } from "react";
import "../../styles/HomeManager.css";
import SubjectComponent from "../../components/SubjectComponent";
//import { useNavigate } from "react-router-dom";

import StudentSidebar from "../../components/StudentSidebar";
import { StudentClass } from "../../types/student-class.types";
import axiosClient from "../../utils/axios.utils";
import { toastError, toastSuccess } from "../../utils/toastEmitter";
import Navbar from "../../components/Navbar";

const HomeManager: React.FC = () => {
  /** Fetch Student Class */
  const [studentClass, setStudentClass] = useState<StudentClass | null>(null);
  useEffect(() => {
    axiosClient
      .get("/student/class")
      .then(({ data }) => {
        setStudentClass(data);
      })
      .catch(({ response: { data } }) => {
        toastError(data.message);
      })
      .finally(() => {});
  }, []);

  return (
    <div className="nav-container">
      <StudentSidebar />

      <div className="main-container">
        {/* Nav */}
        <Navbar />
        <div className="archived-subject-cards-wrapper">
          <SubjectComponent
            classCards={studentClass ? studentClass.classes : []}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeManager;
