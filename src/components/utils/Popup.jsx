import React, { useState, useEffect, useRef } from "react";

const outside = (ref, e) => {
  const x = e.clientX;
  const y = e.clientY;

  const rect = ref.current.getBoundingClientRect();

  if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom)
    return true;

  return false;
};

const Popup = ({
  className = "",
  children,
  triggerRef,
  triggerType = "click",
  onClosing,
  onOpening,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!triggerRef) return;

    const handleTriggerEvent = () => {
      // If triggered by click, toggle the popup
      if (triggerType == "click") setShow((prev) => !prev);
      // If triggered by typing, show the popup if it's not already shown (Instead of toggling)
      else if (triggerType == "keyup") if (!show) setShow(true);
    };

    triggerRef.current.addEventListener(triggerType, handleTriggerEvent);

    return () => {
      if (!triggerRef.current) return;
      triggerRef.current.removeEventListener(triggerType, handleTriggerEvent);
    };
  }, [triggerRef]);

  const popupRef = useRef(null);

  useEffect(() => {
    if (show && onOpening) onOpening();

    const handleClickOutside = (e) => {
      if (!outside(popupRef, e) && !outside(triggerRef, e)) return;
      else if (outside(popupRef, e) && outside(triggerRef, e)) {
        setShow(false);
        if (onClosing) onClosing();
      }
    };

    // Add event listener when the popup is open
    if (show) {
      document.addEventListener("click", handleClickOutside);
    }

    // Remove event listener when the component unmounts or the popup is closed
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [show, popupRef]);

  return (
    show && (
      <div className={`${className} absolute z-50`} ref={popupRef}>
        {children}
      </div>
    )
  );
};

export default Popup;
