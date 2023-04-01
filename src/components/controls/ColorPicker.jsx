import React, { useState, useRef, useEffect } from "react";
import { SketchPicker } from "react-color";
import Popup from "@utils/Popup";

const ColorPicker = ({
  className = "",
  initialColor = "#ff00f0",
  onChange,
  onChangeCompleted,
  icon,
  title = "Color Picker",
}) => {
  const [color, setColor] = useState(initialColor);

  const btnRef = useRef(null);

  const colorChangeHandler = (c) => {
    if (onChange) onChange(c.hex);

    setColor(c.hex);
  };

  const colorChangeCompletedHandler = (c) => {
    if (onChangeCompleted) onChangeCompleted(c.hex);
  };

  return (
    <div className={`${className} relative max-h-full `}>
      <button
        type="button"
        ref={btnRef}
        className={`relative p-1 rounded-[4px] border border-transparent transition-all overflow-hidden hover:bg-[#cccccc]`}
        title={title}
      >
        <img src={icon} alt={title} />
        <div
          className="absolute bottom-0 left-0 w-full h-[6px] "
          style={{
            backgroundColor: color,
          }}
        ></div>
      </button>

      <Popup
        className="absolute -translate-x-1/2 left-1/2 top-[150%] z-50"
        triggerRef={btnRef}
      >
        <SketchPicker
          color={color}
          onChange={(c) => colorChangeHandler(c)}
          onChangeComplete={(c) => colorChangeCompletedHandler(c)}
        />
      </Popup>
    </div>
  );
};
export default ColorPicker;
