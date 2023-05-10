import React from "react";

const PushdownButton = ({ className = "", icon, state, onClick }) => {
  const clickHandler = () => {
    onClick();
  };

  return (
    <button
      type="button"
      className={`${className} p-1 pt-[3px] rounded-[4px] transition-all hover:bg-[#cccccc] ${
        state && "bg-[#cccccc] shadow-sm shadow-[#686868]"
      }`}
      onClick={() => clickHandler()}
    >
      <img className="w-full h-full aspect-square" src={icon} alt="" />
    </button>
  );
};

export default PushdownButton;
