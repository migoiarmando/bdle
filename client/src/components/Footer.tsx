import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <a href="#" className="footer-link" style={{ marginRight: "10px" }}>
        Terms of Use
      </a>
      <a href="#" className="footer-link">
        Privacy Policy
      </a>
      <p>
        This site is protected by Kwatro Kantos. <a href="#">Privacy Policy</a>{" "}
        and <a href="#">Terms of Use apply</a>
      </p>
    </div>
  );
};

export default Footer;
