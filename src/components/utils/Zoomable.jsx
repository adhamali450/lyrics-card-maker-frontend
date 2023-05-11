import { toInteger } from "lodash";
import React, { useState, useRef, useEffect } from "react";

function Zoomable({
  initialScale = 1,
  minScale = 0.5,
  maxScale = 3,
  children,
}) {
  const containerRef = useRef(null);
  const [initialDistance, setInitialDistance] = useState(null);
  const [scale, setScale] = useState(toInteger(initialScale));

  //TODO: Background scale
  // useEffect(() => {
  //   console.log(children);
  //   setScale(initialScale);
  // }, [children]);

  const handleWheel = (event) => {
    const delta = event.deltaY * -1;
    const scaleFactor = 0.05;

    const newScale = scale + scaleFactor * Math.sign(delta);

    const boundedScale = Math.min(Math.max(newScale, minScale), maxScale);

    setScale(boundedScale);
  };

  const handleTouchStart = (event) => {
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];

    if (touch1 && touch2) {
      const distance = getDistance(touch1, touch2);
      setInitialDistance(distance);
    }
  };

  const handleTouchMove = (event) => {
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];

    if (touch1 && touch2) {
      const distance = getDistance(touch1, touch2);

      const scaleFactor = 0.005;
      const newScale =
        scale + scaleFactor * Math.sign(distance - initialDistance);
      const boundedScale = Math.min(Math.max(newScale, minScale), maxScale);

      setScale(boundedScale);
    }
  };

  const getDistance = (touch1, touch2) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  return (
    <div
      ref={containerRef}
      className="overflow-hidden touch-none w-full h-full"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{
        transition: "transform 0.05s ease",
        transformOrigin: "center",
        transform: `scale(${scale})`,
      }}
    >
      {children}
    </div>
  );
}

export default Zoomable;
