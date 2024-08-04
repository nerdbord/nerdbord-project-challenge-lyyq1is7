import React from "react";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";
import { BtnSeeAllMonths } from "./BtnSeeAllMonths";

type WelcomeAllExpensesItemProps = {
  date: string | null;
  total: number | null;
}

const WelcomeAllExpensesItem: React.FC<WelcomeAllExpensesItemProps> = ({date, total}) => {
  return (
    <div className="welcome-all-expenses-box">
      <h4 className="welcome-all-expenses-title">All expenses</h4>
      <div className="welcome-all-expenses-box-items">
        <h5 className="welcome-all-expenses-box-month">{date}</h5>
        <div className="welcome-all-expenses-box-badge-icon">
          <div className="badge badge-outline">{total}</div>
          <div className="welcome-all-expenses-icon-container">
            <span>
              <ArrowRightIcon />
            </span>
          </div>
        </div>
      </div>
      <BtnSeeAllMonths />
    </div>
  );
};

export default WelcomeAllExpensesItem;
