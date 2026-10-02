import React from "react";
import profileImage from "../assets/profile.jpg";

function ProfileCard() {
  return (
    <div className="profile-card">
      <img
        src={profileImage}
        alt="Profile"
        className="profile-image"
      />

      <h2>Rahul Kumar</h2>
      <p>Frontend Developer</p>

      <button>View Profile</button>
    </div>
  );
}

export default ProfileCard;