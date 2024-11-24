import logo from "../assets/images/Ateneo_de_Naga_University_logo.png";
import { useNavigate } from "react-router-dom";
import "./../styles/App.css";
import Footer from "../components/Footer";

function App() {
  const navigate = useNavigate(); //
  return (
    <div className="login-container">
      <div className="outer-container">
        <div className="adnu-logo">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <h2 className="lg-header-2">Welcome to BDLE</h2>

        <div className="buttons">
          <button
            onClick={() => navigate("/manager-home")}
            className="btn teacher"
          >
            Continue as Teacher
          </button>
          <button
            className="btn student-btn"
            onClick={() => navigate("/student-home")}
          >
            Continue as Student
          </button>
        </div>
        {/* <p className="lg-p" onClick={() => navigate("/login")}>
          Don't have an account? <a href="#">Sign In</a>
        </p> */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
