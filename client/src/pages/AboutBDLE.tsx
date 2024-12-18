import React from "react";
import "../styles/About.css";
import BDLELogo from "../assets/bdle-logo-full.png";
import AdnuLogo from "../assets/adnu.svg";
import StudentSidebar from "../components/StudentSidebar";
import MigoiImg from "../assets/dev-photos/migoi.jpg";
import GabImg from "../assets/dev-photos/gab.jpg";
import KarlImg from "../assets/dev-photos/karl.jpg";
import PeterImg from "../assets/dev-photos/peter.jpg";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selector";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { USER_ROLES } from "../constants/UserRoles";

const About: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className="nav-container">
      {currentUser?.role === USER_ROLES.Student ? (
        <StudentSidebar />
      ) : (
        <Sidebar />
      )}

      <div className="main-container">
        {/* Navbar */}
        <Navbar />

        <div className="about-container">
          <div className="mission-section">
            <div className="header-logos">
              <img src={AdnuLogo} alt="Logo 1" className="logo" />
            </div>
            <img src={BDLELogo} alt="Logo 2" className="logo-full" />

            <p>
              BDLE is an innovative system crafted specifically for Ateneo de
              Naga University to simplify and optimize attendance management. By
              harnessing the power of digital technology, it offers a seamless
              and user-friendly platform for tracking student attendance. With
              advanced features like real-time attendance recording, detailed
              analytics, and automated reporting, BDLE empowers educators to
              dedicate more time to teaching and fostering student growth while
              minimizing administrative tasks.
            </p>
          </div>

          {/* Team Section */}
          <div className="team-section">
            <h2>The Team</h2>
            <div className="team-members">
              <div className="team-member">
                <img src={GabImg} className="team-member-image" />
                <h3>Gabriel Señar</h3>
                <p>Frontend Developer</p>
              </div>
              <div className="team-member">
                <img src={KarlImg} className="team-member-image" />
                <h3>Karl Lumabi</h3>
                <p>UI/UX / Frontend Developer</p>
              </div>
              <div className="team-member">
                <img src={MigoiImg} className="team-member-image" />
                <h3>Miguel Sta. Ana</h3>
                <p>Backend Developer</p>
              </div>
              <div className="team-member">
                <img src={PeterImg} className="team-member-image" />
                <h3>Peter Jornales</h3>
                <p>Frontend Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
