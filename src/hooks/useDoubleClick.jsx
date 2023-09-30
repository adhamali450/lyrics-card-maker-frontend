import { useEffect, useState } from "react";

const useDoubleClick = (ref, callback) => {
  const [lastTap, setLastTap] = useState(null);

  const startTouch = (e) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (lastTap && now - lastTap < DOUBLE_TAP_DELAY) {
      callback(e);
    } else {
      setLastTap(now);
    }
  };
  useEffect(() => {
    const element = ref.current;

    if (element) {
      element.addEventListener("dblclick", callback);
      element.addEventListener("touchstart", startTouch);

      return () => {
        element.removeEventListener("dblclick", callback);
        element.removeEventListener("touchstart", startTouch);
      };
    }
  }, [ref, callback]);
};

export default useDoubleClick;
