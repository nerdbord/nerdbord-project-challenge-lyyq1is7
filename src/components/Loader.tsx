import React from "react";

type Props = {};

export const Loader = (props: Props) => {
  return (
    <div className="flex justify-center items-center h-full">
      <span className="loading loading-spinner loading-lg bg-purple-900"></span>
    </div>
  );
};
