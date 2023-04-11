import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  Fragment,
} from "react";
import CardStyleContext from "@contexts/CardStyleContext";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Draggable from "react-draggable";
import EditableLabel from "@controls/EditableLabel";

import { getContrastColor, truncate } from "@/utils";

import styles from "./LyricsCard.module.sass";

import { getPalette } from "color-thief-react";
import axios from "axios";

import CardLogo from "@utils/CardLogo";

import iconTrash from "@assets/icon-trash.svg";
import iconUpload from "@assets/icon-upload.png";

import DragOverlay from "@controls/DragOverlay";
import FileInput from "@controls/FileInput";
import iconQuote from "@assets/quote.png";
import plainBackground from "@assets/plain-background.svg";

const getImagePalette = (url, callback) => {
  // First, use color-thief to get the dominant color
  // If failed, use the backend API

  getPalette(url, 2, "hex", "anonymous")
    .then((colors) => {
      callback(colors[0]);
    })
    .catch(() => {
      // Fallback to backend API
      axios
        .get("https://genius-unofficial-api.vercel.app/api/song/colors", {
          params: { url: url },
        })
        .then((res) => {
          callback(res.data["background_color"]);
        })
        .catch((err) => {
          console.error(err);
        });
    });
};

const imgStateFromUrl = (url, callback) => {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    callback({
      url: url,
      width: img.width,
      height: img.height,
      "aspect-ratio": img.width / img.height,
    });
  };
};

const DummyLyrics = ({ lang, cardStyling }) => {
  const dummyLyrics = [
    ["Click to edit", true],
    ["Press enter to insert new lines", true],
    ["Or just paste some text", true],
  ];

  return (
    <Fragment>
      {dummyLyrics.map((l, i) => {
        if (!l[1]) return;
        return (
          <EditableLabel
            key={i}
            className="text-xl mt-1 pointer-events-auto"
            style={{
              backgroundColor: cardStyling["highlightColor"],
              color: cardStyling["textColor"],
              fontWeight: cardStyling["bold"] ? "bold" : "normal",
              fontStyle: cardStyling["italic"] ? "italic" : "normal",
            }}
            text={l[0]}
            lang={lang}
          />
        );
      })}
    </Fragment>
  );
};

const getLineMax = (aspectRatio) => {
  return {
    "1:1": 50,
    "3:4": 35,
    "4:3": 70,
  }[aspectRatio];
};

const LyricsCard = ({ cardInfo, lyricsData, aspectRatio = "1:1" }) => {
  let { title = "", artist = "" } = cardInfo;
  title = truncate(title, 20);
  artist = truncate(artist);

  const [isFileDragged, setIsFileDragged] = useState(false);
  const [showDragOverlay, setShowDragOverlay] = useState(true);
  const [logoVarient, setLogoVarient] = useState("large");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [backgroundImageScale, setBackgroundImageScale] = useState(1);

  const { cardStyling, setCardStyling } = useContext(CardStyleContext);

  const [controlledPosition, setControlledPosition] = useState({ x: 0, y: 0 });

  let { lang, lyrics, selectionCompleted } = lyricsData;

  useEffect(() => {
    if (!backgroundImage) {
      setCardStyling((prev) => {
        return {
          ...prev,
          bannerBackground: "#f7f16c",
          bannerForeground: "#000000",
        };
      });
      return;
    }

    // Reset zoom and translations
    setControlledPosition({ x: 0, y: 0 });
    setBackgroundImageScale(1);

    // Sampling colors from background image
    getImagePalette(backgroundImage["url"], (color) => {
      setCardStyling((prev) => {
        return {
          ...prev,
          bannerBackground: color,
          bannerForeground: getContrastColor(color),
        };
      });
    });
  }, [backgroundImage]);

  useEffect(() => {
    setLogoVarient(aspectRatio == "3:4" ? "small" : "large");
  }, [aspectRatio]);

  const handleLogoSize = () =>
    setLogoVarient(logoVarient == "large" ? "samll" : "large");

  // File upload
  const fileSelectedHandler = (url) =>
    imgStateFromUrl(url, (st) => setBackgroundImage(st));

  // Zooming to scale
  const wheelHandler = (e) => {
    const delta = e.deltaY;

    if (delta > 0) {
      if (backgroundImageScale <= 0.5) return;

      setBackgroundImageScale((prev) => prev - 0.1);
    } else {
      if (backgroundImageScale >= 3) return;

      setBackgroundImageScale((prev) => prev + 0.1);
    }
  };

  // Drag overlay
  const dragEnterLeaveHandlers = (e) => setIsFileDragged((prev) => !prev);

  const dropHandler = (e) => {
    const files = e.dataTransfer.files;
    const imageUrl = e.dataTransfer.getData("URL");

    let url = "";
    if (imageUrl) {
      // handle image dragged from a browser tab
      url = imageUrl;
    } else {
      // handle image(s) dragged from a file explorer or operating system window
      for (const file of files) {
        // check if the dropped file is an image
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = (e) => {
            url = e.target.result;
          };
        }
      }
    }

    imgStateFromUrl(url, (st) => setBackgroundImage(st));

    setIsFileDragged(false);
  };

  // Draggable (Movable) background
  const onControlledDrag = (e, position) => {
    const { x, y } = position;
    setControlledPosition({ x, y });
  };

  return (
    <div
      className={`${styles["card"]} h-[500px]`}
      style={{
        aspectRatio: aspectRatio.replace(":", "/"),
        transition: "all 0.15s ease-out",
      }}
    >
      <div
        className={`${styles["background"]}`}
        onMouseEnter={() => {
          if (isFileDragged) setShowDragOverlay(true);
          else setShowDragOverlay(false);
        }}
        onMouseLeave={() => {
          setShowDragOverlay(true);
        }}
      >
        {/* Background container */}
        {backgroundImage ? (
          <Draggable position={controlledPosition} onDrag={onControlledDrag}>
            <TransformWrapper>
              <TransformComponent>
                <div className="absolute w-full h-full inset-0 ">
                  <div
                    onWheel={wheelHandler}
                    className="w-full h-full"
                    style={{
                      backgroundPosition: "top center",
                      transform: `scale(${backgroundImageScale})`,
                      backgroundSize: "cover",
                      backgroundImage: `url(${backgroundImage["url"]})`,
                      width:
                        backgroundImage["aspect-ratio"] > 1
                          ? backgroundImage["aspect-ratio"] * 100 + "%"
                          : "100%",
                      height:
                        backgroundImage["aspect-ratio"] > 1
                          ? "100%"
                          : backgroundImage["aspect-ratio"] ** -1 * 100 + "%",
                    }}
                  ></div>
                </div>
              </TransformComponent>
            </TransformWrapper>
          </Draggable>
        ) : (
          <div
            className="w-full h-full grid place-items-center "
            style={{
              backgroundImage: `url(${plainBackground})`,
              backgroundSize: "20px",
              backgroundPosition: "top left",
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

      <main
        className={`${styles["lyrics"]} pointer-events-none flex flex-col`}
        style={{
          alignItems: {
            left: "flex-start",
            center: "center",
            right: "flex-end",
          }[cardStyling["alignment"]],
        }}
      >
        <img
          className="absolute top-[-15%] opacity-40"
          src={iconQuote}
          alt=""
        />

        {!lyrics.some((l) => l[1]) && (
          <DummyLyrics cardStyling={cardStyling} lang={lang} />
        )}

        {lyrics.map((l, i) => {
          if (!l[1]) return;
          return (
            <EditableLabel
              className="text-xl mt-1 pointer-events-auto"
              style={{
                backgroundColor: cardStyling["highlightColor"],
                color: cardStyling["textColor"],
              }}
              key={i}
              text={l[0]}
              lang={lang}
              onTextChanged={(e) => {}}
              lineMax={getLineMax(aspectRatio)}
            />
          );
        })}
      </main>

      {/* Upload/Remove photo buttons */}
      {backgroundImage && (
        <div className="absolute z-[9] top-4 right-4 flex gap-3">
          <FileInput
            className="flex items-center gap-2 border bg-gray-300 rounded-sm opacity-70"
            text="Upload photo"
            onFileSelected={fileSelectedHandler}
          >
            <img className="w-[20px]" src={iconUpload} alt="Upload photo" />
            Upload image
          </FileInput>

          <button
            className="border bg-gray-300 rounded-sm opacity-70 px-[4px] py-[2px]"
            onClick={() => setBackgroundImage(null)}
          >
            <img className="w-[20px]" src={iconTrash} alt="Remove photo" />
          </button>
        </div>
      )}

      <footer
        className="flex border-t-2 gap-4"
        style={{
          backgroundColor: cardStyling["bannerBackground"],
          color: cardStyling["bannerForeground"],
          borderColor: cardStyling["bannerForeground"],
        }}
      >
        <div className={styles["info"]}>
          {artist && (
            <EditableLabel className={styles["artist"]} text={artist} />
          )}
          {title && <EditableLabel className={styles["song"]} text={title} />}
        </div>

        <button className={styles["logo"]} onClick={handleLogoSize}>
          <CardLogo
            varient={logoVarient}
            color={cardStyling["bannerForeground"]}
          />
        </button>
      </footer>
    </div>
  );
};

export default LyricsCard;
