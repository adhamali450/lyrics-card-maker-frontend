import React, { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

import Popup from "@compUtils/Popup";

const ColorPicker = ({
  className = "",
  initialColor = "#ff00ff",
  onChange,
  icon,
  title = "Color Picker",
}) => {
  const [color, setColor] = useState(initialColor);

  const btnRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleTouchMove = (e) => e.preventDefault();
    containerRef.current.addEventListener("touchmove", handleTouchMove);

    return () => {
      if (containerRef.current)
        containerRef.current.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  const colorChangeHandler = (c) => {
    setColor(c);
    if (onChange) onChange(c);
  };

  return (
    <div className={`${className} static sm:relative`} ref={containerRef}>
      <button
        type="button"
        ref={btnRef}
        className={`max-w-full max-h-full relative p-[2px] rounded-[4px] border border-transparent transition-all overflow-hidden hover:bg-[#dddddd]`}
        title={title}
      >
        <img className="w-full h-full" src={icon} alt={title} />
        <div
          className="absolute bottom-0 left-0 w-full h-[4px] xs:h-[6px]"
          style={{
            backgroundColor: color,
          }}
        ></div>
      </button>

      <Popup
        className="absolute -translate-x-1/2 left-1/2 top-[80px] sm:top-[150%] z-50"
        triggerRef={btnRef}
      >
        <HexColorPicker color={color} onChange={colorChangeHandler} />
      </Popup>
    </div>
  );
};
export default ColorPicker;
