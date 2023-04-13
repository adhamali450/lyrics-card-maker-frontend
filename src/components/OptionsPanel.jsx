import React, { useState, useEffect, useContext } from "react";
import CardStyleContext from "@contexts/CardStyleContext";
import PushdownGroup from "@controls/PushdownGroup";
import PopupButton from "@controls/PopupButton";
import ColorPicker from "@components/controls/ColorPicker";
import facebook from "@assets/facebook (3).png";
import twitter from "@assets/twitter (1).png";
import instagram from "@assets/instagram (2).png";

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
      <div className={`${className} flex items-center`}>
        <p className="uppercase text-[#272838] font-bold tracking-tight">
          Style
        </p>

        <PushdownGroup
          values={formattingValues}
          children={[iconsFormatting.bold, iconsFormatting.italic]}
          multiple
          initialIndex={-1}
          selectedItemChanged={(value) =>
            updateStyleFromArray(formattingValues, value)
          }
        />

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

        <PopupButton
          className="inline-block relative lg:hidden ml-auto "
          icon={iconsStyling.size}
        >
          <div id="icon-dropdown" className="inline-block relative">
            <ul id="options" className="p-0 m-0 list-none bg-[#ffffff] border rounded-lg border-black">
              <li className="cursor-pointer p-5 hover:p-4 hover:text-gray-100 hover:bg-violet-600 active:text-gray-100 active:bg-violet-600 active:p-5 "> <span><img src={facebook} alt=""/>1:1</span></li>
              <li className="cursor-pointer p-5 hover:p-4 hover:text-gray-100 hover:bg-violet-600 active:text-gray-100 active:bg-violet-600 active:p-5 "> <span><img src={instagram} alt=""/>3:4</span></li> 
              <li className="cursor-pointer p-5 hover:p-4 hover:text-gray-100 hover:bg-violet-600 active:text-gray-100 active:bg-violet-600 active:p-5 "> <span><img src={twitter} alt=""  />4:3</span></li> 
            </ul>
          </div>
	  
        </PopupButton>
      </div>
    </section>
  );
};

export default OptionsPanel;
