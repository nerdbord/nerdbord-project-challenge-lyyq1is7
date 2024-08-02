import React from "react";
import { HiArrowRight } from "react-icons/hi2";

type WelcomeAllExpensesItemProps = {
  date: string | null;
  total: string | null;
}

const WelcomeAllExpensesItem: React.FC<WelcomeAllExpensesItemProps> = ({date, total}) => {
  return (
    <div className="welcome-all-expenses-box">
      <h4 className="welcome-all-expenses-title">All expenses</h4>
      <div className="welcome-all-expenses-box-items">
        <h5 className="welcome-all-expenses-box-month">{date}</h5>
        <div className="welcome-all-expenses-box-badge-icon">
          <div className="badge badge-neutral">{total}</div>
          <div className="welcome-all-expenses-icon-container">
            <span>
              <HiArrowRight />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeAllExpensesItem;
