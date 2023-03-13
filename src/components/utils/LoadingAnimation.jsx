import React from "react";
import styles from "./LoadingAnimation.module.sass";

const LoadingAnimation = () => {
  return (
    <div className={`self-center ${styles["lds-ellipsis"]}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingAnimation;
