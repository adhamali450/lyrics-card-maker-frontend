import { useEffect } from "react";

const useOnBackButton = (callback) => {
  useEffect(() => {
    window.history.pushState(null, null, null);
    window.addEventListener("popstate", callback);

    return () => {
      window.removeEventListener("popstate", callback);
    };
  }, []);
};

export default useOnBackButton;
