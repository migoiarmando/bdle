import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.tsx";
import "./styles/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import StudentForm from "./pages/StudentForm.tsx";
// Pages
import LoginPage from "./pages/login.tsx"
import ManagerHomepage from "./pages/HomeManager.tsx";
import StudentHomepage from "./pages/HomeStudent.tsx";
import ClassOverview from "./pages/ClassOverview.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* General Routings */}
        <Route path="/" element={<App />} />
        <Route path="/student-form" element={<StudentForm />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route  path="/class-overview" element={<ClassOverview />} />

        {/* Student Routes */}
          {/* Home */}
          <Route  path="/student-home" element={<StudentHomepage />} />

          {/* <Route  path="/class/:id" element={<Class />} /> */}
          
          {/* Calendar */}
          {/* <Route  path="/calendar" element={<Calendar />} />
          <Route  path="calendar-class/:id" element={<Class />} />

          {/* Settings */}
          {/* <Route path="settings" element={<Settings />} /> */}


        {/* Teacher's Routes */}
          {/* Home */}
          <Route  path="/manager-home" element={<ManagerHomepage />} />
          {/* <Route  path="/class-overview/:id" element={<ClassOverview />} /> */}

          {/* Calendar */}
          {/* <Route  path="/calendar" element={<Calendar />} />
          <Route  path="calendar-class/:id" element={<Class />} />
          <Route  path="attendance-view/:id" element={<AttendanceView />} /> */}
      </Routes>
    </Router>
  </StrictMode>
);
