import React from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { BackIcon } from "../icons/BackIcon";

// ALL EXPENSES HEADER
const HeaderAllExpenses = () => {
  return (
    <header className="header-all-expenses">
      <div className="header-all-items">
        <div className="header-all-flex">
          <span className="back-icon">
            <BackIcon />
          </span>

          <h4 className="header-all-expenses-title">All expenses</h4>
        </div>
        <span className="share-icon">
          <ShareIcon />
        </span>
      </div>
      {/* <div className="flex bg-white text-black">
        <span>ikona search</span>
        <span>Content</span>
        <span>ikona filter</span>
      </div> */}
    </header>
  );
};

export default HeaderAllExpenses;
