import React from "react";
import styles from "@components/lyrics-card/LyricsCard.module.sass";

// TODO: Border radius is not working
const WrappingSpan = ({
  className = "",
  children,
  borderRadius = 0,
  alignment = "left",
  style = {},
}) => {
  return (
    <span className="inline bg-transparent leading-none">
      <span
        className={`${className} ${styles["wrapping-span"]} leading-none`}
        style={{
          ...style,
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
          textAlign: alignment ? alignment : "left",
        }}
      >
        {children}
      </span>
    </span>
  );
};

export default WrappingSpan;
