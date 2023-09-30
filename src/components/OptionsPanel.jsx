import { useContext, lazy, Suspense } from "react";
import CardStyleContext from "@contexts/CardStyleContext";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import {
  FontBoldIcon,
  FontItalicIcon,
  TextAlignRightIcon,
  TextAlignLeftIcon,
} from "@radix-ui/react-icons";

const ColorPicker = lazy(() => import("@components/controls/ColorPicker"));

import { iconsStyling } from "@assets/options-panel";

const Hr = () => {
  return <hr className="inline-block bg-gray-300 w-[1px] h-[25px]" />;
};

const OptionsPanel = ({ className }) => {
  const { cardStyling, setCardStyling } = useContext(CardStyleContext);

  const formattingValues = ["bold", "italic"];

  const pushdownIconStyle = (key, value) => {
    return {
      transition: "all 0.15s ease",
      backgroundColor: cardStyling[key] == value ? "#dddddd" : "transparent",
    };
  };
  /**
   * Marks an option as active or inactive from an array of options.
   **/
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
    if (cardStyling[key] == value) return;
    const newCardStyle = { ...cardStyling };
    newCardStyle[key] = value;
    setCardStyling(newCardStyle);
  };

  return (
    <div
      className={`${className} flex items-center justify-between xs:justify-start px-3 xs:px-6 py-2 gap-x-4 gap-y-1`}
    >
      <p className="hidden sm:inline uppercase text-sm text-[#272838] font-medium">
        Style
      </p>

      <ToggleGroup.Root
        className="toggle-group"
        type="multiple"
        onValueChange={(value) => updateStyleFromArray(formattingValues, value)}
      >
        <ToggleGroup.Item value="bold">
          <FontBoldIcon
            className="toogle-group__item__icon"
            style={pushdownIconStyle("bold", true)}
          />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="italic">
          <FontItalicIcon
            className="toogle-group__item__icon"
            style={pushdownIconStyle("italic", true)}
          />
        </ToggleGroup.Item>
      </ToggleGroup.Root>

      <Hr />

      <ToggleGroup.Root
        className="toggle-group"
        type="single"
        defaultValue="left"
        onValueChange={(value) => {
          if (!value) return;
          updateStyle("alignment", value);
        }}
      >
        <ToggleGroup.Item value="left">
          <TextAlignLeftIcon
            className={`toogle-group__item__icon`}
            style={pushdownIconStyle("alignment", "left")}
          />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="right">
          <TextAlignRightIcon
            className={`toogle-group__item__icon`}
            style={pushdownIconStyle("alignment", "right")}
          />
        </ToggleGroup.Item>
      </ToggleGroup.Root>
      <Hr />

      <Suspense>
        <ColorPicker
          className="h-7 xs:h-8 aspect-square"
          initialColor={cardStyling.highlightColor}
          icon={iconsStyling.highlight}
          title="Text highlight color"
          onChange={(c) => updateStyle("highlightColor", c)}
        />
      </Suspense>
      <Hr />

      <Suspense>
        <ColorPicker
          className="h-7 xs:h-8 aspect-square xs:row-start-2"
          initialColor={cardStyling.bannerBackground}
          icon={iconsStyling.fill}
          title="Card banner color"
          onChange={(c) => updateStyle("bannerBackground", c)}
        />
      </Suspense>
    </div>
  );
};

export default OptionsPanel;
