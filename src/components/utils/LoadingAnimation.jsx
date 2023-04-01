import React from "react";
import styles from "./LoadingAnimation.module.sass";

const LoadingAnimation = () => {
  return (
    <div
      className={`justify-self-center self-center ${styles["lds-ellipsis"]}`}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingAnimation;
