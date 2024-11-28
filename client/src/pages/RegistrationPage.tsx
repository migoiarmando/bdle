import "../styles/Register.css";
import adnulogo from "../assets/adnu.svg";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useAppDispatch } from "../redux/store.types";
import { toastError, toastSuccess } from "../utils/toastEmitter";
import axiosClient from "../utils/axios.utils";
import { setCurrentUser } from "../redux/user/user.action";
import { SetStateAction, useState } from "react";
// import { USER_ROLES } from "../constants/UserRoles";

const RegistrationPage: React.FC  = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedValue, setSelectedValue] = useState("Select your role");
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (value: SetStateAction<string>) => {
    setSelectedValue(value);
    setShowOptions(false);
  };
  
  const handleRegister = () => {
    const fullName = (document.getElementById("fullName") as HTMLInputElement)
      .value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const role = (document.getElementById("role") as HTMLSelectElement).value;

    if (!fullName || !email || !password || !role) {
      toastError("All fields are required.");
      return;
    }

    axiosClient
      .post("/auth/register", { fullName, email, password, role })
      .then(({ data }) => {
        toastSuccess("Registration successful!");
        dispatch(setCurrentUser(data));
        navigate(`/dashboard/${role}`);
      })
      .catch(({ response: { data } }) => {
        toastError(data.message);
      });
  };

  return (
    <>
      <div className="register-container">
        <div className="register">
          <div className="header">
            <div className="a-logo">
              <img src={adnulogo} alt="adnu logo" />
            </div>
            <h1>Register to BDLE</h1>
          </div>

          <div className="input">
            <label htmlFor="fullName" className="label">
              Full Name
            </label>
            <input id="fullName" type="text" placeholder="Your Full Name" />

            <label htmlFor="email" className="label">
              Email
            </label>
            <input id="email" type="email" placeholder="xxxxxx@gmail.com" />

            <label htmlFor="password" className="label">
              Password
            </label>
            <input id="password" type="password" placeholder="********" />

            <label htmlFor="role" className="label">
              Role
            </label>
            
            <div className="custom-dropdown">
                <button
                    className="dropdown-btn"
                    onClick={() => setShowOptions(!showOptions)}
                >
                    {selectedValue}
                </button>
                <ul className={`dropdown-options ${showOptions ? "show" : ""}`}>
                    <li
                    className="dropdown-option"
                    onClick={() => handleOptionClick("Student")}
                    >
                    Student
                    </li>
                    <li
                    className="dropdown-option"
                    onClick={() => handleOptionClick("Teacher")}
                    >
                    Teacher
                    </li>
                </ul>
                <input type="hidden" id="role" value={selectedValue} />
            </div>
          </div>

          <button onClick={handleRegister} className="register-btn" type="button">
            Register
          </button>

          <p onClick={() => navigate("/login")}>
            Already have an account? <a href="#">Log In</a>
          </p>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default RegistrationPage;
