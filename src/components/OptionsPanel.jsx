import React, { useState, useEffect, useContext } from "react";
import CardStyleContext from "@contexts/CardStyleContext";
import PushdownGroup from "@controls/PushdownGroup";
import ColorPicker from "@components/controls/ColorPicker";

import {
  iconsAlignent,
  iconsFormatting,
  iconsStyling,
} from "@assets/options-panel";

const OptionsPanel = ({ className, onOptionChanged }) => {
  const { cardStyling, setCardStyling } = useContext(CardStyleContext);

  const formattingValues = ["bold", "italic"];

  /**
   * Marks an option as active or inactive from an array of options.
   */
  const updateStyleFromArray = (src, active) => {
    const newCardStyle = { ...cardStyling };
    src.forEach((el) =>
      active.includes(el)
        ? (newCardStyle[el] = true)
        : (newCardStyle[el] = false)
    );
    setCardStyling(newCardStyle);
  };

  const updateStyle = (key, value) => {
    const newCardStyle = { ...cardStyling };
    newCardStyle[key] = value;
    setCardStyling(newCardStyle);
  };

  return (
    <section>
      <div className={`${className}  flex items-center`}>
        <p className="uppercase text-[#272838] font-bold tracking-tight">
          Style
        </p>

        {/* <PushdownGroup
          values={formattingValues}
          children={[iconsFormatting.bold, iconsFormatting.italic]}
          multiple
          initialIndex={-1}
          selectedItemChanged={(value) =>
            updateStyleFromArray(formattingValues, value)
          }
        /> */}

        <ColorPicker
          initialColor="#ffffff"
          icon={iconsStyling.highlight}
          title="Text highlight color"
          onChangeCompleted={(c) => updateStyle("highlightColor", c)}
        />

        <PushdownGroup
          values={["left", "center", "right"]}
          children={[
            iconsAlignent.left,
            iconsAlignent.center,
            iconsAlignent.right,
          ]}
          initialIndex={cardStyling.alignment == "left" ? 0 : 2}
          selectedItemChanged={(value) => updateStyle("alignment", value)}
        />

        <ColorPicker
          initialColor={"#f7f16c"}
          icon={iconsStyling.fill}
          title="Card banner color"
          onChangeCompleted={(c) => updateStyle("bannerBackground", c)}
        />
      </div>
    </section>
  );
};

export default OptionsPanel;
