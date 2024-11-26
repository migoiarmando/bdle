import "../styles/login.css";
import adnulogo from "../assets/adnu.svg";
import googleLogo from "../assets/google.svg";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect } from "react";
import useGoogleSignIn from "../hooks/useGoogleSignIn";
import { USER_ROLES } from "../constants/UserRoles";
import axiosClient from "../utils/axios.utils";
import { useAppDispatch } from "../redux/store.types";
import { setCurrentUser } from "../redux/user/user.action";
import { toastError } from "../utils/toastEmitter";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { role } = useParams();
  useEffect(() => {
    if (!role || !Object.values(USER_ROLES).includes(role as USER_ROLES)) {
      navigate("/");
    }
  }, [role, navigate]);

  const { signInWithGooglePopUp } = useGoogleSignIn({ role: role! });

  const handleLogin = () => {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    if (!email || !password) {
      toastError("Email or Password cannot be empty.");
      return;
    }
    axiosClient
      .post("/auth/login", { email, password, role })
      .then(({ data }) => {
        dispatch(setCurrentUser(data));
      })
      .catch(({ response: { data } }) => {
        toastError(data.message);
      })
      .finally(() => {});
  };

  return (
    <>
      <div className="login-container">
        <div className="login">
          <div className="header">
            <div className="a-logo">
              <img src={adnulogo} alt="adnu logo" />
            </div>
            <h1>Log In as {role} to BDLE</h1>
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

          <button onClick={handleLogin} className="login-btn" type="button">
            Log In
          </button>

          <p className="p-login">Or continue with</p>

          <button
            className="google-btn"
            type="button"
            onClick={signInWithGooglePopUp}
          >
            <img src={googleLogo} className="google" alt="google" />
            Continue with Google
          </button>

          <p onClick={() => navigate("/")}>
          Not What You Were Looking For? <a href="#"> Go back</a>
          </p>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default LoginPage;
