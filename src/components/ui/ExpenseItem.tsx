import React from "react";
import Badge from "./Badge";

const ExpenseItem = () => {
  const text = "-1000.75 PLN";
  return (
    <div>
      <div>Card Image</div>
      <div>
        <div>
          <span>27.07.2024</span>
          <Badge text={text} />
        </div>
        <span>Name</span>
        <span>rent</span>
      </div>
    </div>
  );
};

export default ExpenseItem;
