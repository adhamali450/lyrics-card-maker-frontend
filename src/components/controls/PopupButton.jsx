import React, { useRef } from "react";
import Popup from "@utils/Popup";

const PopupButton = ({ className = "", children, icon, title }) => {
  const btnRef = useRef(null);
  return (
    <div className={`${className} relative`}>
      <button
        type="button"
        ref={btnRef}
        className={`w-full h-full p-1 relative rounded-[4px] border border-transparent transition-all overflow-hidden hover:bg-[#cccccc]`}
        title={title}
      >
        <img className="w-full h-full aspect-square" src={icon} alt={title} />
      </button>

      <Popup
        className="absolute -translate-x-1/2 left-1/2 top-[150%] z-50"
        triggerRef={btnRef}
      >
        {children}
      </Popup>
    </div>
  );
};

export default PopupButton;
