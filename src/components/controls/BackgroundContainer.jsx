import React, { useRef, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const BackgroundContainer = ({ src }) => {
  const transformWrapperRef = useRef(null);

  useEffect(() => {
    if (!transformWrapperRef.current) return;

    transformWrapperRef.current.resetTransform();
    transformWrapperRef.current.instance.wrapperComponent.style.width = "100%";
    transformWrapperRef.current.instance.wrapperComponent.style.height = "100%";
  }, [src]);

  return (
    <TransformWrapper ref={transformWrapperRef} centerOnInit centerZoomedOut>
      <TransformComponent>
        <img src={src["url"]} alt="card background image" />
      </TransformComponent>
    </TransformWrapper>
  );
};

export default BackgroundContainer;
