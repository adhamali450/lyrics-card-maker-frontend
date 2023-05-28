import React, { Fragment } from "react";
import styles from "@components/lyrics-card/LyricsCard.module.sass";

// TODO: Border radius is not working
const WrappingSpan = ({ className = "", children, style = {} }) => {
  return (
    <Fragment>
      <span className="inline bg-transparent">
        <span
          className={`${className} ${styles["wrapping-span"]}`}
          style={{
            ...style,
            boxDecorationBreak: "clone",
            WebkitBoxDecorationBreak: "clone",
          }}
        >
          {children}
        </span>
      </span>
    </Fragment>
  );
};

export default WrappingSpan;
