import React, { useState } from "react";
import CardSymbol from "@utils/CardSymbol";

const SizeMenu = ({
  className = "",
  cardClassName = "",
  cardStyle = {},
  showLabel = true,
  onSizeChanged = () => {},
}) => {
  const [selectedRatio, setSelectedRatio] = useState("1:1");
  return (
    <section className={className}>
      {[
        ["1:1", "Facebook"],
        ["3:4", "Instagram"],
        ["3:2", "Twitter"],
      ].map(([ratio, title], index) => (
        <button
          className={cardClassName}
          key={index + "-button"}
          style={{}}
          onClick={() => {
            setSelectedRatio(ratio);
            onSizeChanged(ratio);
          }}
        >
          <CardSymbol
            style={{
              ...cardStyle,
              opacity: selectedRatio == ratio ? 1 : 0.5,
              filter:
                selectedRatio == ratio
                  ? "drop-shadow(0px 2px 2px rgba(100, 100, 100, 0.2))"
                  : "none",
            }}
            aspectRatio={ratio}
            state={selectedRatio == ratio ? "active" : "inactive"}
          />
          {showLabel && <span className="text-sm text-[#e0eafb]">{title}</span>}
        </button>
      ))}
    </section>
  );
};

export default SizeMenu;
