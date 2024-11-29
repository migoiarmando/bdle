import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import StudentSidebar from "../components/StudentSidebar";
import Navbar from "../components/Navbar";
import "../styles/Settings.css";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selector";
import { USER_ROLES } from "../constants/UserRoles";
import Sidebar from "../components/Sidebar";

const INITIAL_FORMDATA = {
  _id: "",
  username: "",
  photoURL: "",
};
const Settings: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [formData, setFormData] = useState(INITIAL_FORMDATA);
  useEffect(() => {
    if (!currentUser) return;
    setFormData({
      _id: currentUser?._id,
      username: currentUser?.username,
      photoURL: currentUser?.photoURL ?? "",
    });
  }, [currentUser]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value, files } = e.target;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
          setFormData({
            ...formData,
            [name]: reader.result,
          });
        };
        reader.readAsDataURL(files[0]);
        return;
      }

      setFormData({
        ...formData,
        [name]: value,
      });
    },
    [formData]
  );

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      photoURL: "",
    });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

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
                placeholder="Enter your username"
                style={{ color: "inherit" }}
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>

          {/* Profile Picture Section */}
          <div className="setting-section">
            <h2>Profile Picture</h2>
            <p>Your photo will be displayed in your profile.</p>
            <div className="profile-picture-group">
              <div className="profile-picture-preview">
                {formData.photoURL ? (
                  <img
                    src={formData.photoURL}
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
                name="photoURL"
                onChange={handleChange}
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
