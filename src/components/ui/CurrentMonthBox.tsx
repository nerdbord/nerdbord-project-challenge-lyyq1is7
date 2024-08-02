import React from "react";

const CurrentMonthBox = () => {
  return (
    <div className="current-month-container">
      <div className="current-month-container-items">
        <h4 className="current-month-container-item-text">Current month</h4>
        <span className="current-month-container-item-icons">
          share icon
        </span>
      </div>
      <div className="current-month-container-card">
        <div className="current-month-container-card-items-1">
          <h3 className="current-month-container-card-items-month">
            Jully 2024
          </h3>
          <ul className="current-month-container-card-items-icon-with-number-box">
            <li>dashboard icon</li>
            <li>20</li>
          </ul>
        </div>
        <div className="current-month-container-card-items-2">
          <h5 className="current-month-container-card-items-spends">spends:</h5>
          <div className="current-month-container-card-items-spends-sum">
            <span>-1800,75 $</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentMonthBox;
