import {
  useState,
  useEffect,
  useContext,
  forwardRef,
  lazy,
  Suspense,
} from "react";

import CardStyleContext from "@contexts/CardStyleContext";

import { getContrastColor, getImagePalette, getUpscaledImage } from "@utils";

import routes from "@/js/api/routes";
import usePasteImage from "@hooks/usePasteImage";

import CardFooter from "@components/lyrics-card/CardFooter";
import DragOverlay from "@controls/DragOverlay";
import FileInput from "@controls/FileInput";
import EditableLabel from "@controls/EditableLabel";

const BackgroundContainer = lazy(() => import("@controls/BackgroundContainer"));

import toast, { Toaster } from "react-hot-toast";

import styles from "@components/lyrics-card/LyricsCard.module.sass";

import iconDownload from "@assets/icon-download.svg";
import iconCamera from "@assets/icon-camera.svg";
import iconQuote from "@assets/quote.svg";
import plainBackground from "@assets/plain-background.svg";

const dummyLyrics = [
  ["Search for a song and choose lyrics", true],
  ["Double tap or hold to edit", true],
  ["Press enter when you finish", true],
  ["Or just paste some text", true],
];

const copyLyrics = (lyrics) => lyrics.map((inner) => [...inner]);

const LyricsCard = forwardRef(
  (
    { cardInfo, lyricsData, aspectRatio = "1:1", onDownload = () => {} },
    ref
  ) => {
    let { title = "Song Title", artist = "Artist Name" } = cardInfo;

    const [isFileDragged, setIsFileDragged] = useState(false);
    const [showDragOverlay, setShowDragOverlay] = useState(true);
    const [backgroundImage, setBackgroundImage] = useState(null);

    const { cardStyling, setCardStyling } = useContext(CardStyleContext);

    // const { lyrics } = lyricsData;

    const [lyrics, setLyrics] = useState(
      lyricsData.lyrics.some((l) => l[1])
        ? copyLyrics(lyricsData.lyrics)
        : copyLyrics(dummyLyrics)
    );

    useEffect(() => {
      // When the last line is removed, bring the dummy lyrics back
      if (lyrics.every((l) => !l[1])) setLyrics(copyLyrics(dummyLyrics));
    }, [lyrics]);

    useEffect(() => {
      setLyrics(
        lyricsData.lyrics.some((l) => l[1])
          ? copyLyrics(lyricsData.lyrics)
          : copyLyrics(dummyLyrics)
      );
    }, [lyricsData]);

    // Once a song is selected:
    // 1. Format the artist name and song title
    // 2. Grab the cover as background image
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

    const lyricsEditedHandler = (editedIndex, newLine) => {
      if (newLine == lyrics[editedIndex][0]) return; // Line not changed
      if (newLine == "") {
        lyrics[editedIndex][1] = false;
        setLyrics([...lyrics]);
      } else {
        lyrics[editedIndex][0] = newLine;
        setLyrics([...lyrics]);
      }
    };

    const addLineClickedHandler = () => {
      const newLyrics = [...lyrics];
      newLyrics.push(["Sample line", true]);
      setLyrics(newLyrics);
    };

    return (
      <div
        className={`${styles["card"]} card-size`}
        ref={ref}
        data-aspect-ratio={aspectRatio}
        data-alignment={cardStyling.alignment}
        style={{
          aspectRatio: aspectRatio.replace(":", "/"),
          "--aspect-ratio": aspectRatio,
          transition: "all 0.15s ease-out",
        }}
      >
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
        <main>
          {aspectRatio == "3:2" && (
            <img className={`${styles["quote"]}`} src={iconQuote} alt="" />
          )}

          {/* Lyrics Container*/}
          <div className={`w-full`}>
            <div className={`${styles["lyrics-container"]} w-full`}>
              {lyrics.map((l, i) => {
                if (!l[1]) return;
                return (
                  <EditableLabel
                    key={i}
                    className={`${styles["editable-label"]} pointer-events-auto`}
                    childrenStyle={{
                      backgroundColor: cardStyling["highlightColor"],
                      color: cardStyling["textColor"],
                      textAlign: cardStyling["alignment"],
                      fontWeight: cardStyling["bold"] ? "600" : "500",
                      fontStyle: cardStyling["italic"] ? "italic" : "normal",
                    }}
                    text={l[0]}
                    onChange={(newLine) => lyricsEditedHandler(i, newLine)}
                  />
                );
              })}
              {lyrics.filter((l) => l[1]).length < 4 && (
                <button
                  className="px-2 hide-when-download text-sm border bg-[#f7f16c] border-[#272838] pointer-events-auto"
                  onClick={addLineClickedHandler}
                >
                  + Add line
                </button>
              )}
            </div>

            {/* Aux footer */}
            <CardFooter
              className={`${styles["aux-footer"]}`}
              aspectRatio={aspectRatio}
              title={title}
              artist={artist}
              misc={{ "data-aspect-ratio": aspectRatio }}
            />
          </div>
        </main>
        <CardFooter
          className={`${styles["main-footer"]}`}
          aspectRatio={aspectRatio}
          title={title}
          artist={artist}
          misc={{ "data-aspect-ratio": aspectRatio }}
        />

        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    );
  }
);

LyricsCard.defaultProps = {
  cardInfo: {},
  lyricsData: {},
  aspectRatio: "1:1",
};

export default LyricsCard;
