import React, { useState, useRef, useEffect, Fragment } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import Badge from "@utils/Badge";

const BackgroundContainer = ({ src }) => {
  const [tapped, setTapped] = useState(false);

  const [intractions, setIntractions] = useState({
    zoomed: false,
    moved: false,
  });

  const [imageCoverage, setImageCoverage] = useState(false);

  const transformWrapperRef = useRef(null);

  useEffect(() => {
    if (!transformWrapperRef.current) return;

    transformWrapperRef.current.resetTransform();
    transformWrapperRef.current.instance.wrapperComponent.style.width = "100%";
    transformWrapperRef.current.instance.wrapperComponent.style.height = "100%";

    const observeResize = () => {
      const parentElement =
        transformWrapperRef.current.instance.wrapperComponent.parentNode;
      const resizeObserver = new ResizeObserver(() => {
        updateImageCoverage();
      });
      resizeObserver.observe(parentElement);

      return () => {
        resizeObserver.unobserve(parentElement);
      };
    };

    observeResize();

    updateImageCoverage();
  }, [src]);

  // Calculate image coverage when zoom or pan occurs
  const updateImageCoverage = () => {
    const wrapperElement =
      transformWrapperRef.current.instance.wrapperComponent;
    const imageElement = wrapperElement.querySelector("img");

    if (wrapperElement && imageElement) {
      const wrapperRect = wrapperElement.getBoundingClientRect();
      const imageRect = imageElement.getBoundingClientRect();

      if (
        imageRect.width >= wrapperRect.width &&
        imageRect.height >= wrapperRect.height
      ) {
        setImageCoverage(true);
      } else {
        setImageCoverage(false);
      }
    }
  };

  const scaleHandler = () => {
    if (!intractions.zoomed) {
      setIntractions((prev) => {
        return {
          ...prev,
          zoomed: true,
        };
      });
    }

    updateImageCoverage();
  };

  return (
    <div className="w-full h-full touch-manipulation">
      <div className="hide-when-download absolute z-50 top-[10px] left-[10px] pointer-events-none w-full flex flex-col items-start gap-[2px] msm:gap-1">
        <Badge varient="default" text="click and drag to move the image" />
        <Badge varient="default" text="Zoom the image to scale it" />

        {!imageCoverage && (
          <Badge varient="red" text="Image is out of bounds" />
        )}
      </div>

      <TransformWrapper
        ref={transformWrapperRef}
        centerOnInit
        centerZoomedOut
        onZoom={scaleHandler}
        onPan={scaleHandler}
      >
        <TransformComponent>
          <img src={src["url"]} alt="card background image" />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default React.memo(BackgroundContainer);
