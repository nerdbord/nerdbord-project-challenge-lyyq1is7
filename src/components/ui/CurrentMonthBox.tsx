import React from "react";
import { RxDashboard } from "react-icons/rx";
import { CiShare2 } from "react-icons/ci";

const CurrentMonthBox = () => {
  return (
    <div className="current-month-container">
      <div className="current-month-container-items">
        <h4 className="current-month-container-item-text">Current month</h4>
        <span className="current-month-container-item-icons">
          <CiShare2 />
        </span>
      </div>
      <div className="current-month-container-card">
        <div className="current-month-container-card-items-1">
          <h3 className="current-month-container-card-items-month">
            Jully 2024
          </h3>
          <ul className="current-month-container-card-items-icon-with-number-box">
            <li>
              <RxDashboard />
            </li>
            <li className="number-in-card">20</li>
          </ul>
        </div>
        <div className="current-month-container-card-items-2">
          <div className="current-month-container-card-items-spends">spends:</div>
          <div className="current-month-container-card-items-spends-sum">
            <span className="spends-sum-number">1800,75 PLN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentMonthBox;
