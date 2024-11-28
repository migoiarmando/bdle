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
            onClick={() => navigate("/login/Teacher")}
            className="btn teacher"
          >
            Sign In as Teacher
          </button>
          <button
            className="btn students"
            onClick={() => navigate("/login/Student")}
          >
            Sign In as Student
          </button>
        </div>
        <p onClick={() => navigate("/register")}>
          Don't have an account? <a href="#"> Sign up</a>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default App;
