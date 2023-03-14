import React, { useState } from "react";
import styles from "./LyricsCard.module.sass";

import logoLarge from "@assets/logo-large.png";
import logoSmall from "@assets/logo-small.png";

import iconAddImage from "@assets/add-image.png";
import ImageInput from "../controls/ImageInput";

const LyricsCard = ({ cardInfo }) => {
  const { lyrics, title = "", artist = "" } = cardInfo;

  const [logoVarient, setLogoVarient] = useState(logoLarge);

  const handleLogoSize = () => {
    setLogoVarient(logoVarient == logoLarge ? logoSmall : logoLarge);
  };

  return (
    <div className={styles["card"]}>
      <div className={styles["background"]}>
        <ImageInput className="w-full h-full" />
      </div>

      {/* <div className={styles["shade"]}></div> */}
      <div className={styles["pushdown"]}></div>
      <main className={styles["lyrics"]}></main>

      <footer className="flex">
        <div className={styles["info"]}>
          {title && <p className={styles["artist"]}>{artist}</p>}
          {artist && <p className={styles["song"]}>{title}</p>}
        </div>

        <button className={styles["logo"]} onClick={handleLogoSize}>
          <img className="w-full h-full" src={logoVarient} />
        </button>
      </footer>
    </div>
  );
};

export default LyricsCard;
