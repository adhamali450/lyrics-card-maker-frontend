import React, { Fragment } from "react";
import LoadingAnimation from "@utils/LoadingAnimation";
import iconLyrics from "@assets/icon-lyrics.svg";

import { isArabic } from "@/utils";

const LyricsViewer = ({ id, lyrics }) => {
  return (
    <Fragment>
      {/* State: idle */}
      {id == 0 && (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          <img src={iconLyrics} alt="icon-lyrics" />
          <p>Lyrics appear here</p>
        </div>
      )}

      {/* State: loading */}
      {id != 0 && !lyrics && (
        <div className="w-full h-full flex flex-col items-center justify-center bg-white">
          <LoadingAnimation />
        </div>
      )}

      {/* State: Lyrics container */}
      {lyrics && (
        <div
          className={`w-full h-full flex flex-col bg-white gap-1 p-2`}
          style={{
            direction: isArabic(lyrics) ? "rtl" : "ltr",
          }}
        >
          {lyrics.split("\n").map((line, i) => {
            return line == "." ? (
              <br key={i} className="invisible" />
            ) : line == "." ? (
              <br key={i} className="invisible" />
            ) : (
              <p className="block border px-2 bg-[#e9e9e9] w-fit" key={i}>
                {line}
              </p>
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

export default LyricsViewer;
