import React from "react";
import styles from "./LyricsCard.module.sass";

import logoLarge from "@assets/logo-large.png";
import logoSmall from "@assets/logo-small.png";

const LyricsCard = ({ cardInfo }) => {
  //   const { lyrics, songName, artistName } = cardInfo;
  return (
    <div className={styles["card"]}>
      <div className={styles["background"]}></div>
      <div className={styles["shade"]}></div>
      <div className={styles["pushdown"]}></div>
      <main className={styles["lyrics"]}></main>

      <footer>
        <div className={styles["info"]}>
          <p className={styles["artist"]}>Bob Dylan</p>
          <p className={styles["song"]}>She belongs to me</p>
        </div>

        <img className={styles["logo"]} src={logoLarge} />
      </footer>
    </div>
  );
};

export default LyricsCard;
