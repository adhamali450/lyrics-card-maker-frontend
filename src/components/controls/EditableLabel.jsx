import React, { useState, useRef, useEffect } from "react";
import LyricsBar from "@components/LyricsBar";

import { getLang } from "@/utils";

const EditableLabel = ({ text, onTextChanged, className = "", style = {} }) => {
  const inputRef = useRef([]);
  const containerRef = useRef([]);
  const spanRef = useRef([]);

  const [tabCount, setTabCount] = useState(0);

  const [isEditing, setIsEditing] = useState(false);

  const [inputText, setInputText] = useState(text);

  const [lang, setLang] = useState(getLang(text));

  //TODO: Is this necessary?
  useEffect(() => {
    setInputText(text);
  }, [text]);

  //TODO: Is this necessary?
  useEffect(() => {
    setInputText(text);
    setLang(getLang(text + " "));
  }, [text]);

  const handleDoubleClick = (e = null) => {
    if (e) e.preventDefault();

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
      onDoubleClick={handleDoubleClick}
      onTouchEnd={handleTouchEnd}
      className={`${className} inline-block`}
      ref={containerRef}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          className="text-black"
          type="text"
          value={inputText}
          style={style}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          lang={lang}
          onKeyDown={(e) => handleInputKeydown(e)}
        />
      ) : (
        <span lang={lang}>
          <LyricsBar
            className="first-of-type:rounded-none last-of-type:rounded-none"
            line={[inputText]}
            lineMax={45}
            style={style}
            rounded={false}
            padding={false}
          />
        </span>
      )}
    </div>
  );
};

export default EditableLabel;
