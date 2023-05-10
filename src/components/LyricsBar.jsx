import React, { Fragment } from "react";
import { barToLines } from "@/utils";

const LyricsBar = ({
  className = "",
  line,
  style = {},
  rounded = true,
  padding = true,
  lineMax,
}) => {
  const roundedStyles =
    "first-of-type:rounded-t-[3px] first-of-type:rounded-br-[3px] last-of-type:rounded-b-[3px]";
  const paddingStyles = "px-2 first-of-type:pt-[2px] pb-[2px]";

  const lines = barToLines(line[0], lineMax);

  const alignment = style.textAlign;
  return (
    <span
      className="inline-block"
      style={{
        textAlign: alignment ? alignment : "left",
      }}
    >
      {lines.map((chunk, j) => {
        return (
          <Fragment key={j}>
            <span
              className={`${className} inline-block w-fit ${
                padding && paddingStyles
              } ${rounded && roundedStyles}`}
              style={style}
            >
              {chunk}
            </span>
            <br
              style={{
                display: `${j < lines.length - 1 ? "block" : "none"}`,
              }}
            />
          </Fragment>
        );
      })}
    </span>
  );
};
export default LyricsBar;
