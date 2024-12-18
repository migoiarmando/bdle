import { useState } from "react";
import "./../styles/StudentForm.css";
import logo from "../assets/images/Ateneo_de_Naga_University_logo.png";
import { Link } from "react-router-dom";

const StudentForm = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 1, label: "Terms", description: "Gay si mark" },
    { id: 2, label: "Personal Information", description: "Gay si mark" },
    { id: 3, label: "Student Information", description: "Gay si mark" },
  ];

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handlePrev = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="student-form Outer-container">
      <div className="form-container">
        <div className="progress">
          <div>
            <img src={logo} alt="Logo" className="logo-image" />
            <h1 className="form-h1">ADNU BDLE</h1>
          </div>
          <ul className="progress-steps">
            {steps.map((step) => (
              <li
                key={step.id}
                className={`step ${activeStep === step.id ? "active" : ""}`}
              >
                <span >{step.id}</span>
                <p className="progress-list-label">
                  {step.label}
                  <br />
                 
                </p>
              </li>
            ))}
          </ul>
        </div>
        <form action="">
          <div
            className={`form-one form-step ${activeStep === 1 ? "active" : ""}`}
          >
            <div className="bg-svg"></div>
            <h2>Personal Information</h2>
            <p className="normal-font-size">
              This form is to consolidate information of students of Sir Kevin
              Vega. Please answer honestly. Feel free to answer N/A if not
              applicable. The collected data would be used solely for our class
              to get to know you. Rest assured that all information gathered
              will be handled with utmost confidentiality. Submitting the form
              means that you agree to share the data you will input here. Please
              keep in mind that all information shared in the class is also
              confidential. <br /> <br /> <i>This is in compliance with R.A. 10173 or the Data
              Privacy Act of 2012.</i> 
            </p>
          </div>
          <div
            className={`form-two form-step ${activeStep === 2 ? "active" : ""}`}
          >
            <div className="bg-svg"></div>
            <h2>Personal Information</h2>
            <p>Enter your personal Information</p>
            <div>
              <label>Surname</label>
              <input className="input-wrapper" type="text" />
            </div>
            <div>
              <label>First Name</label>
              <input className="input-wrapper" type="text" />
            </div>
            <div className="birt">
              <label>Date of Birth</label>
              <div className="grouping">
                <input
                  type="date"
                  pattern="[0-9]*"
                  name="day"
                  placeholder="DD"
                  className="input-wrapper date-wrapper"
                />
                
              </div>
            </div>
          </div>
          <div
            className={`form-three form-step ${
              activeStep === 3 ? "active" : ""
            }`}
          >
            <div className="bg-svg"></div>
            <h2>Student information</h2>
            <div>
              <label>IGN</label>
              <input className="input-wrapper" type="text" />
            </div>
            <div>
              <label>Email</label>
              <input className="input-wrapper" type="text" />
            </div>
            <div>
              <label>Password</label>
              <input className="input-wrapper" type="text" />
            </div>
            <div>
              <label>Year Level</label>
              <input className="input-wrapper" type="text" />
            </div>
          </div>
          <div className="btn-group">
            {activeStep > 1 ? (
              <button
                type="button"
                className="btn-prev"
                onClick={handlePrev}
              >
                Go Back
              </button>
            ) : (
              <Link to="/">
                <button type="button" className="btn-prev">
                  Go Back
                </button>
              </Link>
            )}
            {activeStep < steps.length && (
              <button type="button" className="btn-next" onClick={handleNext}>
                Next Step
              </button>
            )}
            {activeStep === steps.length && (
              <Link to="/login">
                <button type="button" className="btn-submit">
                  Submit
                </button>
              </Link>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};

export default StudentForm;
