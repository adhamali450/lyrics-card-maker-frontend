import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SongPreviewSkeleton = ({ className, height }) => {
  return (
    <div className={`${className} max-h-full overflow-hidden flex gap-3`}>
      <SkeletonTheme baseColor="#dedede" highlightColor="#c8c8c8">
        <div
          style={{
            height: "100%",
            width: "auto",
            aspectRatio: "1/1",
          }}
        >
          <Skeleton width="100%" height="100%" />
        </div>

        <div className="flex flex-col justify-center items-start">
          <Skeleton width={128} height={8} style={{ marginBottom: "-10px" }} />
          <Skeleton width={96} height={8} />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default SongPreviewSkeleton;
