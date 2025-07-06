import React from "react";

const HeaderBar = () => {
  return (
    <div className="border-b-border-light border-b-1 p-5 flex items-center justify-between gap-10">
      <div className="flex gap-10">
        <span className={`cursor-pointer text-text-light`}>Dashboard</span>
        <span className={`cursor-pointer text-text-light`}>Room</span>
      </div>
      <div>
        <span>Account</span>
      </div>
    </div>
  );
};

export default HeaderBar;
