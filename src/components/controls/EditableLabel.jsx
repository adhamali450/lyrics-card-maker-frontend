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

  const [containerSize, setContainerSize] = useState({
    width: "auto",
    height: "auto",
  });
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
    setIsEditing(false);

    if (onChange) {
      const computedStyles = window.getComputedStyle(containerRef.current);
      setContainerSize({
        width: computedStyles.width,
        height: computedStyles.height,
      });
      onChange(inputText);
    }
  };

  const handleInputKeydown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      event.preventDefault();
      setIsEditing(false);
      if (onChange) {
        const computedStyles = window.getComputedStyle(containerRef.current);
        setContainerSize({
          width: computedStyles.width,
          height: computedStyles.height,
        });
        onChange(inputText);
      }
    }
  };

  useEffect(() => {
    if (isEditing) {
      setContainerSize({
        width: "auto",
        height: "auto",
      });

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
        width: containerSize.width,
        // height: containerSize.height,
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
