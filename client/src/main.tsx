import { createRoot } from "react-dom/client";
import App from "./pages/App.tsx";
import "./styles/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import StudentForm from "./pages/StudentForm.tsx";

// Pages
import LoginPage from "./pages/LoginPage.tsx";
import RegistrationPage from "./pages/RegistrationPage.tsx";
import Continue from "./pages/Continue.tsx";
import NotFound from "./pages/NotFound.tsx";
import Settings from "./pages/Settings.tsx";
import AboutBDLE from "./pages/AboutBDLE.tsx";

// Prof Pages
import ManagerHomepage from "./pages/ProfViews/HomeManager.tsx";
import ClassOverview from "./pages/ProfViews/ClassOverview.tsx";
import CalendarManager from "./pages/ProfViews/CalendarManager.tsx";
import SpecificDateManager from "./pages/ProfViews/SpecificDateManager.tsx";

// Student Pages
import StudentHomepage from "./pages/StudentViews/HomeStudent.tsx";
import StudentClassOverview from "./pages/StudentViews/StudentClassOverview.tsx";
import CalendarStudent from "./pages/StudentViews/CalendarStudent.tsx";
import SpecificDateStudent from "./pages/StudentViews/SpecificDateStudent.tsx";
import AttendanceRecords from "./pages/ProfViews/AttendanceRecords.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import GuestRoute from "./middlewares/GuestRoute.tsx";
import StudentRoute from "./middlewares/StudentRoute.tsx";
import TeacherRoute from "./middlewares/TeacherRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ToastContainer />
      <Router>
        <Routes>
          {/* General Routings */}
          <Route
            path="/"
            element={
              <GuestRoute>
                <App />
              </GuestRoute>
            }
          />
          <Route
            path="/student-form"
            element={
              <GuestRoute>
                <StudentForm />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <RegistrationPage />
              </GuestRoute>
            }
          />
          <Route
            path="/login/:role"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route
            path="/continue"
            element={
              <GuestRoute>
                <Continue />
              </GuestRoute>
            }
          />

          {/* Student Routes */}
          <Route
            path="/student-home"
            element={
              <StudentRoute>
                <StudentHomepage />
              </StudentRoute>
            }
          />
          <Route
            path="/settings-student"
            element={
              <StudentRoute>
                <Settings />
              </StudentRoute>
            }
          />
          <Route
            path="/class-overview-student/:classId"
            element={
              <StudentRoute>
                <StudentClassOverview />
              </StudentRoute>
            }
          />
          <Route
            path="/calendar-student"
            element={
              <StudentRoute>
                <CalendarStudent />
              </StudentRoute>
            }
          />
          {/* change to dynamic class and date on click */}
          <Route
            path="/specific-date-student/:attendanceId"
            element={
              <StudentRoute>
                <SpecificDateStudent />
              </StudentRoute>
            }
          />

          <Route
            path="/about-us"
            element={
              <StudentRoute>
                <AboutBDLE />
              </StudentRoute>
            }
          />
          {/* Teacher's Routes */}
          <Route
            path="/manager-home"
            element={
              <TeacherRoute>
                <ManagerHomepage />
              </TeacherRoute>
            }
          />
          <Route
            path="/settings-manager"
            element={
              <TeacherRoute>
                <Settings />
              </TeacherRoute>
            }
          />
          <Route
            path="/class-overview/:classId"
            element={
              <TeacherRoute>
                <ClassOverview />
              </TeacherRoute>
            }
          />
          <Route
            path="/calendar-manager"
            element={
              <TeacherRoute>
                <CalendarManager />
              </TeacherRoute>
            }
          />
          {/* change to dynamic class and date on click */}
          <Route
            path="/specific-date-manager/:attendanceId"
            element={
              <TeacherRoute>
                <SpecificDateManager />
              </TeacherRoute>
            }
          />
          {/* No button to this routing yet */}
          <Route
            path="/attendance-records"
            element={
              <TeacherRoute>
                <AttendanceRecords />
              </TeacherRoute>
            }
          />
          <Route
            path="/about-us-manager"
            element={
              <TeacherRoute>
                <AboutBDLE />
              </TeacherRoute>
            }
          />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </PersistGate>
  </Provider>
);
