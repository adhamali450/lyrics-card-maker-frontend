import { useState, useContext, useEffect } from "react";

import CardLogo from "@compUtils/CardLogo";
import EditableLabel from "@controls/EditableLabel";

import CardStyleContext from "@contexts/CardStyleContext";
import { formatCredits } from "@utils";

import styles from "./CardFooter.module.sass";

const CardFooter = ({
  className = "",
  aspectRatio,
  title = "",
  artist = "",
  misc = {},
}) => {
  const { cardStyling } = useContext(CardStyleContext);

  const [footerText, setFooterText] = useState(
    `${formatCredits(artist, "en")}, "${formatCredits(title, "en")}"`
  );
  const [logoVarient, setLogoVarient] = useState("large");

  useEffect(() => {
    setFooterText(
      `${formatCredits(artist, "en")}, "${formatCredits(title, "en")}"`
    );
  }, [artist, title]);

  const footerClassName = `${className} ${styles["card-footer"]}`;

  const toggleLogoSize = () =>
    setLogoVarient(logoVarient == "large" ? "samll" : "large");

  return (
    (aspectRatio == "3:2" && (
      <footer className={footerClassName} {...misc}>
        <EditableLabel
          className={`${styles["credits"]}`}
          text={footerText}
          childrenStyle={{
            color: "white",
          }}
          onChange={setFooterText}
        />
      </footer>
    )) || (
      <footer
        className={footerClassName}
        style={{
          backgroundColor: cardStyling["bannerBackground"],
          color: cardStyling["bannerForeground"],
          borderColor: cardStyling["bannerForeground"],
        }}
        {...misc}
      >
        <EditableLabel
          className={`${styles["credits"]}`}
          text={footerText}
          onChange={setFooterText}
        />

        <button className={styles["logo"]} onClick={toggleLogoSize}>
          <CardLogo
            varient={logoVarient}
            color={cardStyling["bannerForeground"]}
          />
        </button>
      </footer>
    )
  );
};

export default CardFooter;
