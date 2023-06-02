import React, { useState, useRef, useEffect } from "react";

import LyricsBar from "@controls/LyricsBar";
import LoadingAnimation from "@compUtils/LoadingAnimation";

import iconLyrics from "@assets/icon-lyrics.svg";

import { getMaxCharacters } from "@utils";

const truthy = (arr) => {
  return arr?.length > 0;
};

const LyricsViewer = ({
  className,
  id,
  lyricsData,
  colors,
  onSelectionChanged,
  style = {},
}) => {
  const [maxCharacters, setMaxCharacters] = useState(36);
  let { lang, lyrics, selectionCompleted, status } = lyricsData;
  const lyricsContainerRef = useRef(null);

  useEffect(() => {
    if (!lyricsContainerRef.current) return;
    setMaxCharacters(
      getMaxCharacters(lyricsContainerRef.current, "fl-lyrics-viewer-bars")
    );
  }, [lyricsContainerRef]);

  const handleLineClick = (index) => {
    onSelectionChanged(index);
  };

  return (
    <div
      className={`${className} fl-lyrics-viewer-bars relative`}
      style={style}
      ref={lyricsContainerRef}
    >
      {/* State: idle */}
      {!id && (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          <img className="w-12 h-12" src={iconLyrics} alt="icon-lyrics" />
          <p>Lyrics appear here</p>
        </div>
      )}

      {/* State: loading */}
      {id && status == 0 && (
        <div className="w-full h-full grid place-content-center bg-white">
          <LoadingAnimation />
        </div>
      )}

      {/* State: Error fetching lyrics */}
      {status == -1 && (
        <div className="w-full h-full grid place-content-center bg-white text-red-800">
          Couldn't get lyrics. Please try again.
        </div>
      )}

      {/* State: Lyrics fetched */}
      {truthy(lyrics) && status == 1 && (
        <div
          className={`w-full flex flex-col gap-[6px] p-3`}
          style={{
            textAlign: lang == "ar" ? "right" : "left",
            direction: lang == "ar" ? "rtl" : "ltr",
          }}
        >
          {lyrics.map((line, i) => {
            return line == "." ? (
              <br key={i} className="invisible" />
            ) : (
              <button
                className="block w-fit overflow-hidden disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
                key={i}
                onClick={() => handleLineClick(i)}
                disabled={!lyrics[i][1] && selectionCompleted}
                style={{
                  textAlign: "inherit",
                }}
              >
                <LyricsBar
                  line={line}
                  lineMax={maxCharacters["1:1"] * 0.9}
                  style={{
                    backgroundColor:
                      lyrics[i][1] && colors
                        ? colors["background_color"]
                        : "#e9e9e9",
                    color:
                      lyrics[i][1] && colors ? colors["text_color"] : "#000",
                    textAlign: "inherit",
                  }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LyricsViewer;
