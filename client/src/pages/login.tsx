import "../styles/login.css";
import adnulogo from "../assets/adnu.svg";
import googleLogo from "../assets/google.svg";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const login = () => {
  const navigate = useNavigate();
  const navigateToHomePage = () => {
    navigate("/manager-home");
  };
  return (
    <>
      <div className="login-container">
        <div className="login">
          <div className="header">
            <div className="a-logo">
              <img src={adnulogo} alt="adnu logo" />
            </div>
            <h1>Log In to BDLE</h1>
          </div>

          <div className="input">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input id="email" type="email" placeholder="xxxxxx@gmail.com" />

            <label htmlFor="password" className="label">
              Password
            </label>
            <input id="password" type="password" placeholder="xxxxxxxx" />
          </div>

          <button
            onClick={navigateToHomePage}
            className="login-btn"
            type="button"
          >
            Log In
          </button>

          <p className="p-login">Or continue with</p>

          <button className="google-btn" type="button" onClick={() => navigate("/continue")}>
            <img src={googleLogo} className="google" alt="google" />
            Continue with Google
          </button>

          <p onClick={() => navigate("/")}>
            Don't have an account? <a href="#">Sign Up</a>
          </p>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default login;
