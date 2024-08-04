import React from "react";
import RecentDocumentsImage from "./RecentDocumentsImage";

import { HamburgerIcon } from "../icons/HamburgerIcon";


const WelcomeBox = () => {
  return (
    <div className="welcome-container">
      <header className="welcome-header-box">
        <ul className="welcome-header-items">
          <li className="welcome-avatar">
            <div className="avatar">
              <div className="w-24 rounded-xl">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
          </li>
          <li className="welcome-hamburger">
            <HamburgerIcon />
          </li>
        </ul>
      </header>
      <h2 className="welcome-user">Welcome Karolina</h2>
      <p className="welcome-user-question">
        What do you want to summarize today?
      </p>
      <h4 className="welcome-recent-documents">Recent documents(2)</h4>
      <RecentDocumentsImage />
    </div>
  );
};

export default WelcomeBox;
