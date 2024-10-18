import logo from "./images/Ateneo_de_Naga_University_logo.png";
import "./App.css";
import "./SignupPage.css"; 

function App() {
  return (
    <div className="login-container">
    <div className="outer-container">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <h2>Log In</h2>
      <p>Don't have an account? <a href="#">Sign Up</a></p>
      <div className="buttons">
        <button className="btn teacher">Sign Up as Teacher</button>
        <button className="btn student">Sign Up as Student</button>
      </div>
    </div>
    <footer>
      <a href="#">Terms of Use</a>
      <a href="#">Privacy Policy</a>
      <p>This site is protected by Kwatro Kantos. Privacy Policy and Terms of Use apply.</p>
    </footer>
  </div>
  );
}

export default App;
