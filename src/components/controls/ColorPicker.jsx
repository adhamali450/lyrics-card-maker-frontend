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
  const containerRef = useRef(null);

  const handleTouchMove = (e) => e.preventDefault();
  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    });

    return () => {
      containerRef.current.removeEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
    };
  }, [containerRef]);

  const colorChangeHandler = (c) => {
    if (onChange) onChange(c.hex);

    setColor(c.hex);
  };

  const colorChangeCompletedHandler = (c) => {
    if (onChangeCompleted) onChangeCompleted(c.hex);
  };

  return (
    <div className={`${className} static sm:relative`} ref={containerRef}>
      <button
        type="button"
        ref={btnRef}
        className={`max-w-full max-h-full relative p-[2px] rounded-[4px] border border-transparent transition-all overflow-hidden hover:bg-[#cccccc]`}
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
