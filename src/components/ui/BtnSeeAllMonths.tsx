import React from "react";

type BtnSeeAllMonthsProps = {}
export const BtnSeeAllMonths = (props: BtnSeeAllMonthsProps) => {
  return (
    <div className="btn-container">
      <button
        type="button"
        className="btn btn-outline btn-primary btn-see-all-months"
      >
        See all months
      </button>
    </div>
  );
};
