import LoadingAnimation from "@compUtils/LoadingAnimation";

const DownloadingOverlay = ({ className }) => {
  return (
    <div
      className={`${className} absolute w-full h-full inset-0 z-[5] flex flex-col items-center justify-center`}
    >
      <LoadingAnimation />
    </div>
  );
};

export default DownloadingOverlay;
