import React, { useState, useRef, useEffect, Fragment } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import Badge from "@compUtils/Badge";

const BackgroundContainer = ({ src }) => {
  const [intractions, setIntractions] = useState({
    zoomed: false,
    moved: false,
  });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);

  const [imageCoverage, setImageCoverage] = useState(false);

  const transformWrapperRef = useRef(null);

  if (isTransforming) document.body.classList.add("background-moving");
  else document.body.classList.remove("background-moving");

  useEffect(() => {
    if (!transformWrapperRef.current) return;

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

    transformWrapperRef.current.resetTransform();
    transformWrapperRef.current.instance.wrapperComponent.style.width = "100%";
    transformWrapperRef.current.instance.wrapperComponent.style.height = "100%";

    observeResize();

    updateImageCoverage();
  }, [src, transformWrapperRef.current]);

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
        console.log("outside");

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

    // TODO: Manage IsTrasforming for scaling
    updateImageCoverage();
  };

  return (
    <div
      className="w-full h-full touch-manipulation"
      onPointerDown={() => setIsMouseDown(true)}
      onPointerMove={() => {
        if (isMouseDown && !isTransforming) setIsTransforming(true);
      }}
      onPointerUp={() => {
        setIsMouseDown(false);
        setIsTransforming(false);
      }}
      onPointerOut={() => {
        setIsMouseDown(false);
        setIsTransforming(false);
      }}
    >
      <div className="card-overlay absolute z-50 top-[10px] left-[10px] pointer-events-none w-full flex flex-col items-start gap-[2px] msm:gap-1">
        <Badge>click and drag to move the image</Badge>
        <Badge>Zoom the image to scale it</Badge>

        {!imageCoverage && <Badge varient="red">Image is out of bounds</Badge>}
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
