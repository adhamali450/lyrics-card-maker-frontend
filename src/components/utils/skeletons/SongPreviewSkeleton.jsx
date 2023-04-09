import React, { useRef, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SongPreviewSkeleton = ({ className }) => {
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      setContainerHeight(`calc(${containerHeight}px)`);
    }
  }, []);
  return (
    <div
      className={`${className} max-h-full overflow-hidden flex gap-3`}
      ref={containerRef}
    >
      <SkeletonTheme baseColor="#dedede" highlightColor="#c8c8c8">
        <Skeleton
          height="100%"
          width="auto"
          style={{
            aspectRatio: "1/1",
          }}
        />
        <div className="flex flex-col justify-center items-start">
          <Skeleton width={128} height={8} style={{ marginBottom: "-10px" }} />
          <Skeleton width={96} height={8} />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default SongPreviewSkeleton;
