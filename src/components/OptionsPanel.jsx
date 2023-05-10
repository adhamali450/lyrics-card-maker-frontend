import React, { useState, useEffect, useContext } from "react";
import CardStyleContext from "@contexts/CardStyleContext";
import PushdownGroup from "@controls/PushdownGroup";
import ColorPicker from "@components/controls/ColorPicker";

import {
  iconsAlignent,
  iconsFormatting,
  iconsStyling,
} from "@assets/options-panel";

const Hr = () => {
  return <hr className="inline-block bg-gray-300 w-[1px] h-[25px]" />;
};

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
      <div
        className={`${className} flex items-center justify-between xs:justify-start px-3 xs:px-6 py-2 gap-x-4 gap-y-1 flex-wrap`}
      >
        <p className="hidden sm:inline uppercase text-[#272838] font-bold tracking-tight">
          Style
        </p>

        <PushdownGroup
          className="h-7 xs:h-8 xs:row-start-1"
          values={formattingValues}
          children={[iconsFormatting.bold, iconsFormatting.italic]}
          multiple
          initialIndex={-1}
          selectedItemChanged={(value) =>
            updateStyleFromArray(formattingValues, value)
          }
        />

        <Hr />

        <PushdownGroup
          className="h-7 xs:h-8 xs:row-start-2"
          values={["left", "center", "right"]}
          children={[
            iconsAlignent.left,
            iconsAlignent.center,
            iconsAlignent.right,
          ]}
          initialIndex={cardStyling.alignment == "left" ? 0 : 2}
          selectedItemChanged={(value) => updateStyle("alignment", value)}
        />

        <Hr />

        <ColorPicker
          className="h-7 xs:h-8 aspect-square xs:row-start-1"
          initialColor="#ffffff"
          icon={iconsStyling.highlight}
          title="Text highlight color"
          onChangeCompleted={(c) => updateStyle("highlightColor", c)}
        />

        <Hr />

        <ColorPicker
          className="h-7 xs:h-8 aspect-square xs:row-start-2"
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
