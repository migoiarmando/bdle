import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.tsx";
import "./styles/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import StudentForm from "./pages/StudentForm.tsx";

// Pages
import LoginPage from "./pages/login.tsx";
import Continue from "./pages/Continue.tsx";
import NotFound from "./pages/NotFound.tsx";

// Prof Pages
import ManagerHomepage from "./pages/ProfViews/HomeManager.tsx";
import ClassOverview from "./pages/ProfViews/ClassOverview.tsx";
import CalendarManager from "./pages/ProfViews/CalendarManager.tsx";
import SpecificDateManager from "./pages/ProfViews/SpecificDateManager.tsx";

// Student Pages
import StudentHomepage from "./pages/StudentViews/HomeStudent.tsx";
import StudentClassOverview from "./pages/StudentViews/StudentClassOverview.tsx";
import CalendarStudent from "./pages/StudentViews/CalendarStudent.tsx";
import SpecificDateStudent from "./pages/StudentViews/SpecificDateStudent.tsx"
import AttendanceRecords from "./pages/ProfViews/AttendanceRecords.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* General Routings */}
        <Route path="/" element={<App />} />
        <Route path="/student-form" element={<StudentForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/continue" element={<Continue />} />
        

        {/* Student Routes */}
      
          <Route  path="/student-home" element={<StudentHomepage />} />
          <Route  path="/class-overview-student" element={<StudentClassOverview />} />          
          <Route  path="/calendar-student" element={<CalendarStudent />} />
          
          {/* change to dynamic class and date on click */}
          <Route  path="/specific-date-student" element={<SpecificDateStudent />} />


        {/* Teacher's Routes */}
          
          <Route  path="/manager-home" element={<ManagerHomepage />} />
          <Route  path="/class-overview" element={<ClassOverview />} />
          <Route  path="/calendar-manager" element={<CalendarManager />} />
          
          {/* change to dynamic class and date on click */}
          <Route  path="/specific-date-manager" element={<SpecificDateManager />} />

          {/* No button to this routing yet */}
          <Route  path="/attendance-records" element={<AttendanceRecords />} />
          
     
          {/* 404 */}
          <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  </StrictMode>
);
