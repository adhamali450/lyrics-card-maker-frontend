import React, { useEffect, useState } from "react";
import PushdownButton from "@controls/PushdownButton";

const getInitialSelectionMap = (children, initialIndex, multiple) => {
  return Array(children.length)
    .fill(0)
    .map((_, i) => {
      return multiple ? initialIndex.includes(i) : initialIndex == i;
    });
};

const PushdownGroup = ({
  className = "",
  children,
  selectedItemChanged = () => {},
  values,
  initialIndex = 0,
  multiple = false,
}) => {
  if (multiple)
    if (!Array.isArray(initialIndex)) initialIndex = [initialIndex];
    else if (Array.isArray(initialIndex)) initialIndex = initialIndex[0];

  const [selectionMap, setSelectionMap] = useState(
    getInitialSelectionMap(children, initialIndex, multiple)
  );

  //TODO: Is this the clean way?
  useEffect(() => {
    setSelectionMap(getInitialSelectionMap(children, initialIndex, multiple));
  }, []);

  const clickHandler = (index) => {
    // If the last to deselect, do nothing (Multiple don't apply)
    if (
      !multiple &&
      selectionMap.filter((s) => s).length == 1 &&
      selectionMap[index]
    )
      return;

    const updated = selectionMap.map((s, i) => {
      if (multiple) return i == index ? !s : s;
      else return i == index;
    });

    setSelectionMap(updated);

    const selectedValues = updated
      .map((s, i) => s && values[i])
      .filter((s) => s);

    selectedItemChanged(multiple ? selectedValues : selectedValues[0]);
  };

  return (
    <div className={`${className} flex gap-1 max-h-full`}>
      {children.map((child, index) => {
        return (
          <PushdownButton
            key={index}
            icon={child}
            onClick={() => clickHandler(index)}
            state={selectionMap[index]}
          />
        );
      })}
    </div>
  );
};

export default PushdownGroup;
