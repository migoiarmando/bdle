import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.tsx";
import "./styles/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentForm from "./pages/StudentForm.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/student-form" element={<StudentForm />} />
      </Routes>
    </Router>
  </StrictMode>
);
