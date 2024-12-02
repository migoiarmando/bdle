import "../styles/Register.css";
import adnulogo from "../assets/adnu.svg";
import Footer from "../components/Footer";
import { useAppDispatch } from "../redux/store.types";
import { toastError } from "../utils/toastEmitter";
import axiosClient from "../utils/axios.utils";
import { setCurrentUser } from "../redux/user/user.action";
import { ChangeEvent, useCallback, useState } from "react";
// import { USER_ROLES } from "../constants/UserRoles";

const INITIAL_DATA = {
  username: "",
  email: "",
  password: "",
  cpassword: "",
  role: "Select your role",
};
const RegistrationPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [showOptions, setShowOptions] = useState(false);

  const [formData, setFormData] = useState(INITIAL_DATA);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    },
    [formData]
  );

  const handleOptionClick = (value: string) => {
    setFormData({
      ...formData,
      role: value,
    });
    setShowOptions(false);
  };

  const handleRegister = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!emailRegex.test(formData.email)) {
      toastError("Invalid email format");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      toastError("Password must be at least 8 characters long and include at least one symbol.");
      return;
    }

    axiosClient
      .post("/auth/register", formData)
      .then(({ data }) => {
        dispatch(setCurrentUser(data));
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
            <label htmlFor="username" className="label">
              Full Name
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Your Full Name"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="xxxxxx@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label htmlFor="password" className="label">
              Confirm Password
            </label>
            <input
              id="cpassword"
              name="cpassword"
              type="password"
              placeholder="********"
              value={formData.cpassword}
              onChange={handleChange}
              required
            />

            <label htmlFor="role" className="label">
              Role
            </label>
            <div className="custom-dropdown">
              <button
                id="role"
                className="dropdown-btn"
                onClick={() => setShowOptions(!showOptions)}
              >
                {formData.role}
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
            </div>
          </div>

          <button
            onClick={handleRegister}
            className="register-btn"
            type="button"
          >
            Register
          </button>

          <p>
            Already have an account? <a href="/">Log In</a>
          </p>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default RegistrationPage;
