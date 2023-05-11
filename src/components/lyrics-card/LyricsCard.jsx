import React, {
  useState,
  useEffect,
  useContext,
  forwardRef,
  Fragment,
} from "react";

import CardStyleContext from "@contexts/CardStyleContext";

import Draggable from "react-draggable";
import Zoomable from "@utils/Zoomable";

import EditableLabel from "@controls/EditableLabel";

import {
  getContrastColor,
  truncate,
  getImagePalette,
  getUpscaledImage,
} from "@/utils";

import styles from "./LyricsCard.module.sass";

import CardLogo from "@utils/CardLogo";

import routes from "@/js/api/routes";

import iconTrash from "@assets/icon-trash.svg";
import iconCamera from "@assets/icon-camera.svg";

import DragOverlay from "@controls/DragOverlay";
import FileInput from "@controls/FileInput";
import iconQuote from "@assets/quote.svg";
import plainBackground from "@assets/plain-background.svg";

const imgStateFromUrl = (url, callback, onError = () => {}) => {
  const img = new Image();
  img.src = url;
  img.onerror = (e) => {
    onError(e);
  };
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
            className="fl-card-lyrics mt-1 pointer-events-auto"
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

const LyricsCard = forwardRef(
  ({ cardInfo, lyricsData, aspectRatio = "1:1" }, ref) => {
    let { title = "", artist = "" } = cardInfo;
    title = truncate(title, 20);
    artist = truncate(artist);

    const [isFileDragged, setIsFileDragged] = useState(false);
    const [showDragOverlay, setShowDragOverlay] = useState(true);
    const [logoVarient, setLogoVarient] = useState("large");
    const [backgroundImage, setBackgroundImage] = useState(null);

    const { cardStyling, setCardStyling } = useContext(CardStyleContext);

    const [controlledPosition, setControlledPosition] = useState({
      x: 0,
      y: 0,
    });

    let { lang, lyrics } = lyricsData;

    // Load the cover image as the background image
    useEffect(() => {
      if (cardInfo.image) {
        getUpscaledImage(cardInfo.image, (url) =>
          imgStateFromUrl(
            url,
            (st) => {
              setBackgroundImage(st);
            },
            (e) => {}
          )
        );
      } else {
        setBackgroundImage(null);
      }
    }, [cardInfo]);

    useEffect(() => {
      if (!backgroundImage) return;

      // Reset zoom and translations
      setControlledPosition({ x: 0, y: 0 });

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

    const toggleLogoSize = () =>
      setLogoVarient(logoVarient == "large" ? "samll" : "large");

    // File upload
    const fileSelectedHandler = (url) => {
      imgStateFromUrl(url, (st) => setBackgroundImage(st));
    };

    const resetCardHandler = () => {
      setBackgroundImage(null);
      setCardStyling((prev) => {
        return {
          ...prev,
          bannerBackground: "#f7f16c",
          bannerForeground: "#000000",
        };
      });
    };

    // Drag overlay
    const dragEnterLeaveHandlers = (e) => setIsFileDragged((prev) => !prev);

    const dropHandler = (e) => {
      const files = e.dataTransfer.files;
      const imageUrl = e.dataTransfer.getData("URL");

      let url = "";
      if (imageUrl) {
        // handle image dragged from a browser
        routes
          .getCORSImage(imageUrl)
          .then((res) => {
            imgStateFromUrl(res.data, (st) => setBackgroundImage(st));
          })
          //TODO: Handle it visually
          .catch(() => console.error("Couldn't get this photo"));
      } else {
        // handle image(s) dragged from a file explorer or operating system window
        for (const file of files) {
          // check if the dropped file is an image
          if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (e) => {
              url = e.target.result;
              imgStateFromUrl(url, (st) => setBackgroundImage(st));
            };
          }
        }
      }

      setIsFileDragged(false);
    };

    // Draggable (Movable) background
    const onControlledDrag = (e, position) => {
      const { x, y } = position;
      setControlledPosition({ x, y });
    };

    return (
      <div
        className={`${styles["card"]} w-full h-auto msm:w-auto msm:h-[500px]`}
        ref={ref}
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
            <Zoomable initialScale="1">
              <Draggable
                position={controlledPosition}
                onDrag={onControlledDrag}
              >
                <div className="absolute w-full h-full inset-0 ">
                  <div
                    // onWheel={wheelHandler}
                    className="w-full h-full"
                    style={{
                      backgroundPosition: "top center",
                      // transform: `scale(${backgroundImageScale})`,
                      backgroundSize: "cover",
                      backgroundImage: `url(${backgroundImage["url"]})`,
                      width:
                        backgroundImage["aspect-ratio"] > 1
                          ? backgroundImage["aspect-ratio"] * 100.5 + "%"
                          : "100.5%",
                      height:
                        backgroundImage["aspect-ratio"] > 1
                          ? "100.5%"
                          : backgroundImage["aspect-ratio"] ** -1 * 100.5 + "%",
                    }}
                  ></div>
                </div>
              </Draggable>
            </Zoomable>
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
          <img className="w-10 absolute top-[-25px]" src={iconQuote} alt="" />

          {/* Dummy lyrics */}
          {!lyrics.some((l) => l[1]) && (
            <DummyLyrics cardStyling={cardStyling} lang={lang} />
          )}

          {/* Lyrics */}
          {lyrics.map((l, i) => {
            if (!l[1]) return;
            return (
              <EditableLabel
                className="fl-card-lyrics mt-1 pointer-events-auto"
                style={{
                  backgroundColor: cardStyling["highlightColor"],
                  color: cardStyling["textColor"],
                  textAlign: cardStyling["alignment"],
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

        {/* Secondary panel: Upload/Remove photo buttons */}
        {backgroundImage && (
          <div className="hide-when-download absolute z-[9] top-4 right-4 flex gap-3">
            <FileInput
              className="h-[40px] sm:h-[50px] aspect-square grid place-items-center bg-gray-800 p-2 rounded-full opacity-80"
              text="Upload photo"
              onFileSelected={fileSelectedHandler}
            >
              <img
                className="w-full h-full"
                src={iconCamera}
                alt="Upload photo"
              />
            </FileInput>

            <button
              className="h-[40px] sm:h-[50px] aspect-square grid place-items-center bg-gray-800 p-2 rounded-full opacity-80"
              onClick={resetCardHandler}
            >
              <img
                className="w-full h-full"
                src={iconTrash}
                alt="Remove photo"
              />
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
              <EditableLabel
                className={`fl-card-footer ${styles["artist"]}`}
                text={artist}
              />
            )}
            {title && (
              <EditableLabel
                className={`fl-card-footer ${styles["song"]}`}
                text={title}
              />
            )}
          </div>

          <button className={styles["logo"]} onClick={toggleLogoSize}>
            <CardLogo
              varient={logoVarient}
              color={cardStyling["bannerForeground"]}
            />
          </button>
        </footer>
      </div>
    );
  }
);

export default LyricsCard;
