import React, { useState, useRef, useEffect } from "react";
import LyricsBar from "@components/LyricsBar";

import { getLang } from "@/utils";

const EditableLabel = ({
  text,
  onTextChanged,
  // lang,
  className = "",
  style = {},
}) => {
  const inputRef = useRef([]);
  const containerRef = useRef([]);
  const spanRef = useRef([]);

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

  const handleDoubleClick = () => {
    setIsEditing(true);
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
