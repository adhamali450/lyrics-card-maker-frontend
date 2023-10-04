import React, { useState, useRef, useEffect } from "react";
import WrappingSpan from "@controls/WrappingSpan";
import useDoubleClick from "@hooks/useDoubleClick";
import { useLongPress } from "@uidotdev/usehooks";

import { getLang } from "@utils";

const EditableLabel = ({
  text,
  onChange,
  className = "",
  style = {},
  childrenStyle = {},
}) => {
  const inputRef = useRef([]);
  const containerRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);

  const [inputText, setInputText] = useState(text);

  const [lang, setLang] = useState(getLang(text));

  useEffect(() => {
    setInputText(text);
    setLang(getLang(text + " "));
  }, [text]);

  const handleDoubleClick = (e) => {
    e.preventDefault();

    setIsEditing(true);
  };
  useDoubleClick(containerRef, handleDoubleClick);

  const longPressAttrs = useLongPress(handleDoubleClick, {
    threshold: 400,
  });

  const handleInputChange = (event) => {
    setLang(getLang(event.target.value));
    setInputText(event.target.value);
  };

  const handleInputBlur = () => {
    if (onChange) onChange(inputText);
    setIsEditing(false);
  };

  const handleInputKeydown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      event.preventDefault();
      setIsEditing(false);
      if (onChange) onChange(inputText);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current.setSelectionRange(0, inputText.length);
      inputRef.current.focus();
    }
  }, [isEditing]);

  const alignment = childrenStyle.textAlign;

  return (
    <div
      className={`${className} inline-block`}
      style={{
        ...style,
        textAlign: alignment ? alignment : "left",
      }}
      ref={containerRef}
      {...longPressAttrs}
    >
      {isEditing ? (
        <textarea
          ref={inputRef}
          type="text"
          value={inputText}
          rows={Math.ceil((inputText.length + 1) / 55)}
          cols={Math.min(inputText.length + 1, 55)}
          style={{
            ...childrenStyle,
            padding: "4px",
            resize: "none",
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
