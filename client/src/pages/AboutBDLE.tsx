import React from 'react';
import '../styles/About.css';
import BDLELogo from '../assets/bdle-logo-full.png'
import AdnuLogo from '../assets/adnu.svg'
import StudentNavbar from '../components/StudentNavbar';
import StudentSidebar from '../components/StudentSidebar';
import MigoiImg from '../assets/dev-photos/migoi.jpg'

// change monalang sa photo nila
import GabImg from '../assets/dev-photos/migoi.jpg'
import KarlImg from '../assets/dev-photos/migoi.jpg'
import PeterImg from '../assets/dev-photos/migoi.jpg'

const About: React.FC = () => {
  return (
    <div className="nav-container">
    <StudentSidebar />

    <div className="main-container">
      {/* Navbar */}
      <StudentNavbar />

      <div className="about-container">
      <div className="mission-section">
        <div className="header-logos">
          <img src={AdnuLogo} alt="Logo 1" className="logo" />
        </div>
        <img src={BDLELogo} alt="Logo 2" className="logo-full" />

        <p>
         BDLE is a modern solution tailored for Ateneo de Naga University, designed to streamline and simplify 
         attendance tracking. This system leverages digital technology to enhance classroom management by providing
          an efficient, accurate, and user-friendly platform for monitoring student attendance. 
          With features such as real-time attendance recording, detailed analytics, and automated reporting,
          it empowers educators to focus more on teaching and less on administrative task. 
         
        </p>
      </div>


      {/* Team Section */}
      <div className="team-section">
        <h2>The Team</h2>
        <div className="team-members">

            <div className="team-member">
              <img
                src={GabImg}
                className="team-member-image"
              />
              <h3>Gabriel Señar</h3>
              <p>Frontend Developer</p>
            </div>
            <div className="team-member">
              <img
                src={KarlImg}
                className="team-member-image"
              />
              <h3>Karl Lumabi</h3>
              <p>UI/UX / Frontend Developer</p>
            </div>
            <div className="team-member">
              <img
                src={MigoiImg}
                className="team-member-image"
              />
              <h3>Miguel Sta. Ana</h3>
              <p>Backend Developer</p>
            </div>
            <div className="team-member">
              <img
                src={PeterImg}
                className="team-member-image"
              />
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
