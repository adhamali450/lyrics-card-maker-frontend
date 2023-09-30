import { useState, useRef, useEffect, Fragment } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import Badge from "@compUtils/Badge";

const BackgroundContainer = ({ src }) => {
  const [image, setImage] = useState(null);
  const [tapped, setTapped] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);

  const [imageCoverage, setImageCoverage] = useState(false);

  const transformWrapperRef = useRef(null);

  useEffect(() => {
    if (src) {
      setImage(src.url);
      setTapped(false);
    }
  }, [src]);

  const markAsTapped = () => {
    if (!tapped) setTapped(true);
  };

  if (isTransforming) document.body.classList.add("background-moving");
  else document.body.classList.remove("background-moving");

  useEffect(() => {
    if (!transformWrapperRef.current) return;

    const wrapper = transformWrapperRef.current.instance.wrapperComponent;

    const observeResize = () => {
      const parentElement = wrapper.parentNode;
      const resizeObserver = new ResizeObserver(() => {
        updateImageCoverage();
      });
      resizeObserver.observe(parentElement);

      return () => {
        resizeObserver.unobserve(parentElement);
      };
    };

    transformWrapperRef.current.resetTransform();
    wrapper.style.width = "100%";
    wrapper.style.height = "100%";

    wrapper.addEventListener("pointerdown", markAsTapped);
    observeResize();

    updateImageCoverage();
  }, [src, transformWrapperRef.current]);

  // Calculate image coverage when zoom or pan occurs
  const updateImageCoverage = () => {
    if (!transformWrapperRef.current) return;

    const wrapperElement =
      transformWrapperRef.current.instance.wrapperComponent;
    const imageElement = wrapperElement.querySelector("img");

    if (wrapperElement && imageElement) {
      const wrapperRect = wrapperElement.getBoundingClientRect();
      const imageRect = imageElement.getBoundingClientRect();

      if (
        imageRect.width >= wrapperRect.width &&
        imageRect.height >= wrapperRect.height
      )
        setImageCoverage(true);
      else setImageCoverage(false);
    }
  };

  const scaleHandler = () => {
    markAsTapped();

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
        {!tapped && <Badge varient="yellow">Tap to edit background</Badge>}

        {tapped && (
          <Fragment>
            <Badge>click and drag to move the image</Badge>

            {(imageCoverage && <Badge>Zoom the image to scale it</Badge>) || (
              <Badge varient="red">Image is out of bounds</Badge>
            )}
          </Fragment>
        )}
      </div>

      <TransformWrapper
        ref={transformWrapperRef}
        centerOnInit
        centerZoomedOut
        onZoom={scaleHandler}
        onPan={scaleHandler}
        onPinchingStart={markAsTapped}
        onPanningStart={markAsTapped}
      >
        <TransformComponent>
          <img src={image} alt="card background image" />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default BackgroundContainer;
