import React from "react";
import LoadingAnimation from "@utils/LoadingAnimation";
import LyricsBar from "@components/LyricsBar";
import iconLyrics from "@assets/icon-lyrics.svg";

const truthy = (arr) => {
  return arr.length > 0;
};

const LyricsViewer = ({
  className,
  id,
  lyricsData,
  colors,
  onSelectionChanged,
}) => {
  const { lang, lyrics, selectionCompleted } = lyricsData;

  const handleLineClick = (index) => {
    onSelectionChanged(index);
  };

  return (
    <div className={className}>
      {/* State: idle */}
      {!id && (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          <img src={iconLyrics} alt="icon-lyrics" />
          <p>Lyrics appear here</p>
        </div>
      )}

      {/* State: loading */}
      {id && !truthy(lyrics) && (
        <div className="w-full h-full flex flex-col items-center justify-center bg-white">
          <LoadingAnimation />
        </div>
      )}

      {/* State: Lyrics container */}
      {truthy(lyrics) && (
        <div
          className={`w-full h-full flex flex-col gap-[6px] p-3 `}
          style={{
            textAlign: lang == "ar" ? "rtl" : "ltr",
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
                  style={{
                    backgroundColor:
                      lyrics[i][1] && colors ? colors["text_color"] : "#e9e9e9",
                    color:
                      lyrics[i][1] && colors
                        ? colors["background_color"]
                        : "#000",
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
