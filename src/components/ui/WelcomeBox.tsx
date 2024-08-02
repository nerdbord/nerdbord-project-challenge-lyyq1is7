import React from "react";
import RecentDocumentsImage from "./RecentDocumentsImage";

const WelcomeBox = () => {
  return (
    <div className="welcome-container">
      <header className="welcome-header-box">
        <ul className="welcome-header-items">
            <li className="welcome-avatar">Avatar</li>
            <li className="welcome-hamburger">Hamburger</li>
        </ul>
      </header>
      <h3 className="welcome-user">Welcome Karolina</h3>
      <p className="welcome-user-question">What do you want to summarize today?</p>
      <h4 className="welcome-recent-documents">Recent documents(2)</h4>
      <RecentDocumentsImage />
    </div>
  );
};

export default WelcomeBox;
