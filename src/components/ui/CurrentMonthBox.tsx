import React from "react";
import { RxDashboard } from "react-icons/rx";
import { CiShare2 } from "react-icons/ci";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";
import HeaderAllExpenses from "./HeaderAllExpenses";

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
          <div className="current-month-container-card-items-spends">
            spends:
          </div>
          <div className="current-month-container-card-items-spends-sum">
            <span className="spends-sum-number">1800,75 PLN</span>
          </div>
        </div>
      </div>
      <h4 className="welcome-all-expenses-title">All expenses</h4>
      <div className="welcome-all-expenses-box-items">
        <h5 className="welcome-all-expenses-box-month">June 2024</h5>
        <div className="welcome-all-expenses-box-badge-icon">
          <div className="badge badge-outline">32,40 PLN</div>
          <div className="welcome-all-expenses-icon-container">
            <span>
              <ArrowRightIcon />
            </span>
          </div>
        </div>
      </div>
      <div className="welcome-all-expenses-box-items">
        <h5 className="welcome-all-expenses-box-month">April 2024</h5>
        <div className="welcome-all-expenses-box-badge-icon">
          <div className="badge badge-outline">98,30 PLN</div>
          <div className="welcome-all-expenses-icon-container">
            <span>
              <ArrowRightIcon />
            </span>
          </div>
        </div>
      </div>
      <div className="welcome-all-expenses-box-items">
        <h5 className="welcome-all-expenses-box-month">May 2024</h5>
        <div className="welcome-all-expenses-box-badge-icon">
          <div className="badge badge-outline">3 560,00 PLN</div>
          <div className="welcome-all-expenses-icon-container">
            <span>
              <ArrowRightIcon />
            </span>
          </div>
        </div>
      </div>
      <div className="btn-container">
        <button
          type="button"
          className="btn btn-outline btn-primary btn-see-all-months"
        >
          See all months
        </button>
      </div>
      
    </div>
  );
};

export default CurrentMonthBox;
