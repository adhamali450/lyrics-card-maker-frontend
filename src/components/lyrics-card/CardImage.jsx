import { Suspense, lazy, useState, useContext, useEffect } from "react";
const BackgroundContainer = lazy(() => import("@controls/BackgroundContainer"));
import DragOverlay from "@controls/DragOverlay";
import FileInput from "@controls/FileInput";
import toast from "react-hot-toast";

import CardStyleContext from "@contexts/CardStyleContext";

import usePasteImage from "@hooks/usePasteImage";

import routes from "@/js/api/routes";
import { getImagePalette, getUpscaledImage, getContrastColor } from "@utils";

import iconDownload from "@assets/icon-download.svg";
import iconCamera from "@assets/icon-camera.svg";
import plainBackground from "@assets/plain-background.svg";

import styles from "./LyricsCard.module.sass";

const CardImage = ({ cardInfo, onDownload }) => {
  const [isFileDragged, setIsFileDragged] = useState(false);
  const [showDragOverlay, setShowDragOverlay] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const { setCardStyling } = useContext(CardStyleContext);

  // Once a song is selected:
  // - Grab the cover for the background image
  useEffect(() => {
    if (cardInfo.image) {
      if (backgroundImage && backgroundImage.type == "external") return;

      getUpscaledImage(cardInfo.image, (url) => {
        setBackgroundImage({
          url: url,
          type: "default",
        });
      });
    } else {
      setBackgroundImage(null);
    }
  }, [cardInfo]);

  useEffect(() => {
    if (!backgroundImage) {
      setCardStyling((prev) => {
        return {
          ...prev,
          bannerBackground: "#f7f16c",
          bannerForeground: "#000",
        };
      });

      return;
    }

    getImagePalette(backgroundImage.url, (color) => {
      setCardStyling((prev) => {
        return {
          ...prev,
          bannerBackground: color,
          bannerForeground: getContrastColor(color),
        };
      });
    });
  }, [backgroundImage]);

  const mouseEnterHandler = () => {
    if (isFileDragged) setShowDragOverlay(true);
    else setShowDragOverlay(false);
  };

  const mouseLeaveHandler = () => {
    setShowDragOverlay(true);
  };

  // Handles image from file input
  const fileSelectedHandler = (url) => {
    setBackgroundImage({
      url: url,
      type: "external",
    });
  };

  // Drag overlay
  const dragEnterLeaveHandlers = (e) => setIsFileDragged((prev) => !prev);

  const dropHandler = (e) => {
    const files = e.dataTransfer.files;
    const imageUrl = e.dataTransfer.getData("URL");

    let url = "";
    // Handle image dragged from a browser
    if (imageUrl) {
      const promise = routes.getCORSImage(imageUrl).then((res) => {
        setBackgroundImage({
          url: res.data,
          type: "external",
        });
      });

      toast.promise(promise, {
        loading: "Fetching image...",
        success: <p>Image fetched successfully!</p>,
        error: <p>Failed to fetch image. Please try again.</p>,
      });
    }
    // Handle image dragged from a file explorer or operating system window
    else {
      for (const file of files) {
        // check if the dropped file is an image
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = (e) => {
            url = e.target.result;
            setBackgroundImage({
              url: url,
              type: "external",
            });
          };
        }
      }
    }

    setIsFileDragged(false);
  };

  // Handles image Pasted from clipboard
  usePasteImage((url) => {
    setBackgroundImage({
      url: url,
      type: "external",
    });
  });

  return (
    <div>
      <div
        className={`${styles["background"]}`}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        {backgroundImage ? (
          <Suspense>
            <BackgroundContainer src={backgroundImage} />
          </Suspense>
        ) : (
          <div
            className={styles["plain-background"]}
            style={{
              backgroundImage: `url(${plainBackground})`,
            }}
          ></div>
        )}

        {/* Drag / Drop */}
        <DragOverlay
          visible={showDragOverlay || !backgroundImage}
          isFileDragged={isFileDragged}
          target={backgroundImage}
          onTargetSelected={fileSelectedHandler}
          onDragEnterLeave={dragEnterLeaveHandlers}
          onDrop={dropHandler}
        />
      </div>
      {backgroundImage && <div className={styles["shade"]}></div>}

      {/* Secondary panel: Upload/Remove photo buttons */}
      {backgroundImage && (
        <div className="card-overlay absolute z-[9] top-4 right-4 flex gap-3">
          <FileInput
            className="h-[40px] sm:h-[50px] aspect-square grid place-items-center bg-gray-800 p-2 rounded-full opacity-100"
            text="Upload photo"
            onFileSelected={fileSelectedHandler}
          >
            <img
              className="w-full h-full"
              src={iconCamera}
              alt="Upload photo"
            />
          </FileInput>
          {/* TODO: Download and share */}
          <button
            className="h-[40px] sm:h-[50px] aspect-square grid place-items-center bg-gray-800 p-2 rounded-full opacity-100"
            onClick={onDownload}
          >
            <img
              className="w-full h-full"
              src={iconDownload}
              alt="Download or share card"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default CardImage;
