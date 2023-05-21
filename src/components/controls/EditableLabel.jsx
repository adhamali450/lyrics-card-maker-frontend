import React, { useState, useRef, useEffect } from "react";
import LyricsBar from "@controls/LyricsBar";
import WrappingSpan from "@controls/WrappingSpan";

import { getLang } from "@/utils";

//TODO: Input the same size as the text
const EditableLabel = ({
  text,
  onTextChanged,
  className = "",
  style = {},
  childrenStyle = {},
  lineMax,
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
    if (onTextChanged) onTextChanged(inputText);
    setIsEditing(false);
  };

  const handleInputKeydown = (event) => {
    if (event.key === "Enter") {
      if (onTextChanged) onTextChanged(inputText);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      className={`${className} inline-block`}
      onDoubleClick={handleDoubleClick}
      onTouchEnd={handleTouchEnd}
      style={style}
      ref={containerRef}
    >
      {isEditing ? (
        <textarea
          ref={inputRef}
          className="text-black"
          type="text"
          value={inputText}
          style={{
            ...childrenStyle,
            width: spanSize.width,
            height: spanSize.height,
            resize: "none",
          }}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          lang={lang}
          onKeyDown={handleInputKeydown}
        />
      ) : (
        <span lang={lang} className="leading-[0]">
          {/* <LyricsBar
            className="first-of-type:rounded-none last-of-type:rounded-none"
            line={[inputText]}
            lineMax={lineMax}
            style={childrenStyle}
            rounded={false}
            padding={false}
          /> */}
          <WrappingSpan style={childrenStyle}>{inputText}</WrappingSpan>
        </span>
      )}
    </div>
  );
};

export default EditableLabel;
