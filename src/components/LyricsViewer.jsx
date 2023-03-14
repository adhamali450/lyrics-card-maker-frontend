import React, { Fragment } from "react";
import LoadingAnimation from "@utils/LoadingAnimation";
import iconLyrics from "@assets/icon-lyrics.svg";

import { isArabic } from "@/utils";

const LyricsViewer = ({ className, id, lyrics }) => {
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
      {id && !lyrics && (
        <div className="w-full h-full flex flex-col items-center justify-center bg-white">
          <LoadingAnimation />
        </div>
      )}

      {/* State: Lyrics container */}
      {lyrics && (
        <div
          className={`w-full h-full flex flex-col bg-white gap-1 p-3`}
          style={{
            direction: isArabic(lyrics) ? "rtl" : "ltr",
          }}
        >
          {lyrics.split("\n").map((line, i) => {
            return line == "." ? (
              <br key={i} className="invisible" />
            ) : (
              <p
                className="block border px-2 bg-[#e9e9e9] w-fit rounded-[3px]"
                key={i}
              >
                {line}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LyricsViewer;
