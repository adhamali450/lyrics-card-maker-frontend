import React from "react";

const PushdownButton = ({ className = "", icon, state, onClick }) => {
  const clickHandler = () => {
    onClick();
  };

  return (
    <button
      type="button"
      className={`${className} p-1 rounded-[4px] transition-all w-8 hover:bg-[#cccccc] ${
        state && "bg-[#cccccc] shadow-sm shadow-[#686868]"
      }`}
      onClick={() => clickHandler()}
    >
      <img className="max-h-full aspect-square" src={icon} alt="" />
    </button>
  );
};

export default PushdownButton;
