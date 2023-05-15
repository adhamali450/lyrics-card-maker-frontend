import { useEffect, useRef } from "react";

const usePasteImage = (callback) => {
  const imageUrlRef = useRef("");

  useEffect(() => {
    const handlePaste = (event) => {
      const items = (event.clipboardData || event.originalEvent.clipboardData)
        .items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          const reader = new FileReader();
          reader.onload = (event) => {
            imageUrlRef.current = event.target.result;
            callback(imageUrlRef.current);
          };
          reader.readAsDataURL(file);
          break;
        }
      }
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [callback]);

  return imageUrlRef;
};

export default usePasteImage;
