import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  Fragment,
} from "react";
import CardStyleContext from "@contexts/CardStyleContext";
import Draggable from "react-draggable";
import EditableLabel from "@controls/EditableLabel";

import { getContrastColor, truncate } from "@/utils";

import styles from "./LyricsCard.module.sass";

import { getPalette } from "color-thief-react";
import axios from "axios";

import Logo from "@utils/Logo";

import iconTrash from "@assets/icon-trash.svg";
import iconUpload from "@assets/icon-upload.png";

import DragOverlay from "@controls/DragOverlay";
import ImageInput from "@controls/ImageInput";
import FileInput from "@controls/FileInput";
import iconQuote from "@assets/quote.png";
import plainBackground from "@assets/plain-background.svg";

const getImagePalette = (url, callback) => {
  // First, use color-thief to get the dominant color
  // If failed, use the API

  getPalette(url, 2, "hex", "anonymous")
    .then((colors) => {
      callback(colors[0]);
    })
    .catch(() => {
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

const ImgStateFromUrl = (url, callback) => {
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
            onTextChanged={(e) => console.log(e)}
          />
        );
      })}
    </Fragment>
  );
};

const LyricsCard = ({ cardInfo, lyricsData }) => {
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

  const handleLogoSize = () =>
    setLogoVarient(logoVarient == "large" ? "samll" : "large");

  // File upload
  const fileSelectedHandler = (url) =>
    ImgStateFromUrl(url, (st) => setBackgroundImage(st));

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

    ImgStateFromUrl(url, (st) => setBackgroundImage(st));

    setIsFileDragged(false);
  };

  // Draggable (Movable) background
  const onControlledDrag = (e, position) => {
    const { x, y } = position;
    setControlledPosition({ x, y });
  };

  return (
    <div className={styles["card"]}>
      <div
        className={`${styles["background"]}`}
        onMouseEnter={(e) => {
          if (isFileDragged) setShowDragOverlay(true);
          else setShowDragOverlay(false);
        }}
        onMouseLeave={(e) => {
          setShowDragOverlay(true);
        }}
      >
        {/* Background container */}
        {backgroundImage ? (
          <Draggable position={controlledPosition} onDrag={onControlledDrag}>
            <div className="absolute w-full h-full inset-0 ">
              <div
                onWheel={wheelHandler}
                className="w-full h-full "
                style={{
                  transform: `scale(${backgroundImageScale})`,
                  // transformOrigin: "top left",
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
        className={`${styles["lyrics"]} pointer-events-none`}
        dir={lang == "ar" ? "rtl" : "ltr"}
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
          <Logo varient={logoVarient} color={cardStyling["bannerForeground"]} />
        </button>
      </footer>
    </div>
  );
};

export default LyricsCard;
