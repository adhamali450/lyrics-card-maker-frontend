import LoadingAnimation from "@compUtils/LoadingAnimation";

const DownloadingOverlay = ({ className, style, ratio }) => {
  return (
    <div
      className={`${className} absolute inset-0 z-[9] flex flex-col items-center justify-center`}
      style={style}
      data-aspect-ratio={ratio}
    >
      <LoadingAnimation />
    </div>
  );
};

export default DownloadingOverlay;
