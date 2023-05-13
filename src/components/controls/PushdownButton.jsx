import React from "react";

const PushdownButton = ({ className = "", icon, state, onClick }) => {
  const clickHandler = () => {
    onClick();
  };

  return (
    <button
      type="button"
      className={`${className} p-1 pt-[3px] rounded-[4px] transition-all`}
      style={{
        backgroundColor: state ? "#cccccc" : "transparent",
        boxShadow: state ? "0px 1px 2px rgb(0  0  0 / 0.5)" : "",
      }}
      onClick={() => clickHandler()}
    >
      <img className="w-full h-full aspect-square" src={icon} alt="" />
    </button>
  );
};

export default PushdownButton;
