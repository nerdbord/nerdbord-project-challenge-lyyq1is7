import React from "react";
import RecentDocumentsImage from "./RecentDocumentsImage";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxAvatar } from "react-icons/rx";

const WelcomeBox = () => {
  return (
    <div className="welcome-container">
      <header className="welcome-header-box">
        <ul className="welcome-header-items">
            <li className="welcome-avatar"><RxAvatar /></li>
            <li className="welcome-hamburger"><RxHamburgerMenu /></li>
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
