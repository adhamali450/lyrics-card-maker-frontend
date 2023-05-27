import React, { useState, useRef, useEffect } from "react";
import LyricsBar from "@controls/LyricsBar";
import WrappingSpan from "@controls/WrappingSpan";

import { getLang } from "@utils";

//TODO: Input the same size as the text
const EditableLabel = ({
  text,
  onChange,
  className = "",
  style = {},
  childrenStyle = {},
}) => {
  const inputRef = useRef([]);
  const containerRef = useRef(null);

  const [tabCount, setTabCount] = useState(0);

  const [isEditing, setIsEditing] = useState(false);

  const [inputText, setInputText] = useState(text);

  const [spanSize, setSpanSize] = useState({});

  const [lang, setLang] = useState(getLang(text));

  //TODO: Is this necessary?
  useEffect(() => {
    setInputText(text);
  }, [text]);

  //TODO: Is this necessary?
  useEffect(() => {
    setLang(getLang(text + " "));
  }, [text]);

  const handleDoubleClick = (e) => {
    e.preventDefault();

    // set input size to be the same as the label
    setSpanSize({
      width: getComputedStyle(containerRef.current).width,
      height: getComputedStyle(containerRef.current).height,
    });
    setIsEditing(true);
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length > 1) {
      // If the user taps with two fingers, it's not a double-tap
      return;
    }
    if (tabCount === 1) {
      // If the user has already tapped once, reset the count
      setTabCount(0);
      // Handle the double-tap event
      handleDoubleClick(e);
    } else {
      // If this is the first tap, increment the count
      setTabCount(1);
    }
  };

  const handleInputChange = (event) => {
    setLang(getLang(event.target.value));
    setInputText(event.target.value);
  };

  const handleInputBlur = () => {
    if (onChange) onChange(inputText);
    setIsEditing(false);
  };

  const handleInputKeydown = (event) => {
    if (event.key === "Enter") {
      if (onChange) onChange(inputText);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current.setSelectionRange(inputText.length, inputText.length);
      inputRef.current.focus();
    }
  }, [isEditing]);

  const alignment = childrenStyle.textAlign;
  return (
    <div
      className={`${className} inline-block`}
      onDoubleClick={handleDoubleClick}
      onTouchEnd={handleTouchEnd}
      style={{
        ...style,
        textAlign: alignment ? alignment : "left",
      }}
      ref={containerRef}
    >
      {isEditing ? (
        <textarea
          ref={inputRef}
          type="text"
          value={inputText}
          style={{
            ...childrenStyle,
            width: spanSize.width,
            height: spanSize.height,
            resize: "horizontal",
            color: "black",
          }}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          lang={lang}
          onKeyDown={handleInputKeydown}
        />
      ) : (
        <span lang={lang} className="leading-[0]">
          <WrappingSpan style={childrenStyle}>{inputText}</WrappingSpan>
        </span>
      )}
    </div>
  );
};

export default EditableLabel;
