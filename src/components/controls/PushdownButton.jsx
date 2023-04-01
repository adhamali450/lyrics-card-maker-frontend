import React from "react";

const PushdownButton = ({ className = "", icon, state, onClick }) => {
  const clickHandler = () => {
    onClick();
  };

  return (
    <button
      type="button"
      className={`${className} p-1 rounded-[4px] border border-transparent transition-all w-8 hover:bg-[#cccccc] ${
        state && "bg-[#adadad] border -[#686868] shadow-sm shadow-[#686868]"
      }`}
      onClick={() => clickHandler()}
    >
      <img className="max-h-full aspect-square" src={icon} alt="" />
    </button>
  );
};

export default PushdownButton;
