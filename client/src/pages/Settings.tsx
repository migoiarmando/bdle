import React, { useState } from "react";
import StudentSidebar from "../components/StudentSidebar";
import Navbar from "../components/Navbar";
import "../styles/Settings.css";

const Settings: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) setProfileImage(e.target.result.toString());
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  return (
    <div className="nav-container">
      <StudentSidebar />

      <div className="main-container">
        {/* Navbar */}
        <Navbar />

        <div className="settings-container">
          <span>Settings</span>
          <h1>Profile Settings</h1>

          {/* Username Section */}
          <div className="setting-section">
            <h2>Full Name</h2>
            <p>Your name will be displayed in your profile.</p>
            <div className="input-group">
              <input
                type="text"
                className="setting-text-input"
                placeholder="Enter your username"
              />
            </div>
            <button className="submit-btn">Submit</button>
          </div>

          {/* Profile Picture Section */}
          <div className="setting-section">
            <h2>Profile Picture</h2>
            <p>Your photo will be displayed in your profile.</p>
            <div className="profile-picture-group">
              <div className="profile-picture-preview">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="profile-picture"
                  />
                ) : (
                  <div className="placeholder-circle">No Image</div>
                )}
              </div>
              <div className="profile-picture-buttons">
                <label htmlFor="profileUpload" className="upload-btn">
                  Upload new picture
                </label>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={handleRemoveImage}
                >
                  Remove
                </button>
              </div>
              <input
                id="profileUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
