import React from "react";

const WelcomeAllExpensesItem = () => {
  return (
    <div>
      <h4 className="welcome-all-expenses-title">All expenses</h4>
      <div>
        <div>June 2024</div>
        <div>
          <div>
            <div><div className="badge badge-neutral">320,40 $</div></div>
            <button className="btn btn-secondary">Two</button>

          </div>
          <div>
            <span>arrow right</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeAllExpensesItem;
