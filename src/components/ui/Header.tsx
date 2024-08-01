import React from "react";

// ALL EXPENSES HEADER
const Header = () => {
  return (
    <header className="flex w-full h-[500px] bg-black text-white py-4">
      <div>All expenses</div>
      <div className="flex ">
        <span>ikona</span>
        <span>share ikona</span>
      </div>
      <div className="flex bg-white text-black">
        <span>ikona search</span>
        <span>Content</span>
        <span>ikona filter</span>
      </div>
      
    </header>
  );
};

export default Header;
