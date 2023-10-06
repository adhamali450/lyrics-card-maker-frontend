import { useState, useRef, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Badge from "@compUtils/Badge";

const BackgroundContainer = ({ src: { url } = {} }) => {
  const [image, setImage] = useState(null);
  const [tapped, setTapped] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [imageCoverage, setImageCoverage] = useState(false);

  const transformWrapperRef = useRef(null);

  useEffect(() => {
    if (url) {
      setImage(url);
      setTapped(false);
    }
  }, [url]);

  const updateImageCoverage = () => {
    const wrapperElement =
      transformWrapperRef.current?.instance.wrapperComponent;
    const imageElement = wrapperElement?.querySelector("img");

    if (wrapperElement && imageElement) {
      const wrapperRect = wrapperElement.getBoundingClientRect();
      const imageRect = imageElement.getBoundingClientRect();
      setImageCoverage(
        imageRect.width >= wrapperRect.width &&
          imageRect.height >= wrapperRect.height
      );
    }
  };

  const handlePointer = (down) => {
    setIsMouseDown(down);
    if (!down) setIsTransforming(false);
  };

  useEffect(() => {
    const wrapper = transformWrapperRef.current?.instance.wrapperComponent;
    if (!wrapper) return;

    const observeResize = () => {
      const parentElement = wrapper.parentNode;
      const resizeObserver = new ResizeObserver(updateImageCoverage);
      resizeObserver.observe(parentElement);

      return () => resizeObserver.unobserve(parentElement);
    };

    transformWrapperRef.current.resetTransform();
    wrapper.style.width = "100%";
    wrapper.style.height = "100%";
    wrapper.addEventListener("pointerdown", () => setTapped(true));

    const cleanup = observeResize();
    updateImageCoverage();

    return () => {
      wrapper.removeEventListener("pointerdown", () => setTapped(true));
      cleanup();
    };
  }, [url]);

  return (
    <div
      className={`w-full h-full touch-manipulation ${
        isTransforming ? "background-moving" : ""
      }`}
      onPointerDown={() => handlePointer(true)}
      onPointerMove={() => {
        if (isMouseDown && !isTransforming) setIsTransforming(true);
      }}
      onPointerUp={() => handlePointer(false)}
      onPointerOut={() => handlePointer(false)}
    >
      <div className="card-overlay absolute z-50 top-[10px] left-[10px] pointer-events-none w-full flex flex-col items-start gap-[2px] msm:gap-1">
        {!tapped && <Badge varient="yellow">Tap to edit background</Badge>}
        {tapped && (
          <>
            <Badge>click and drag to move the image</Badge>
            {imageCoverage ? (
              <Badge>Zoom the image to scale it</Badge>
            ) : (
              <Badge varient="red">Image is out of bounds</Badge>
            )}
          </>
        )}
      </div>

      <TransformWrapper
        ref={transformWrapperRef}
        centerOnInit
        centerZoomedOut
        onZoom={updateImageCoverage}
        onPan={updateImageCoverage}
        onPinchingStart={() => setTapped(true)}
        onPanningStart={() => setTapped(true)}
      >
        <TransformComponent>
          <img src={image} alt="card background image" />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default BackgroundContainer;
