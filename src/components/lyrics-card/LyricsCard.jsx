import { useState, useEffect, useContext, forwardRef } from "react";

import CardStyleContext from "@contexts/CardStyleContext";

import CardImage from "./CardImage";
import CardFooter from "./CardFooter";
import EditableLabel from "@controls/EditableLabel";

import styles from "./LyricsCard.module.sass";

import iconQuote from "@assets/quote.svg";

const dummyLyrics = [
  ["Search for a song and choose lyrics", true],
  ["Double tap or hold to edit", true],
  ["Press enter when you finish", true],
  ["Or just paste some text", true],
];

const copyLyrics = (lyrics) => lyrics.map((inner) => [...inner]);

const LyricsCard = forwardRef(
  ({ cardInfo, lyricsData, aspectRatio = "1:1", onSave = () => {} }, ref) => {
    let { title = "Song Title", artist = "Artist Name" } = cardInfo;

    const { cardStyling } = useContext(CardStyleContext);

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
        <CardImage cardInfo={cardInfo} onDownload={onDownload} />

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
