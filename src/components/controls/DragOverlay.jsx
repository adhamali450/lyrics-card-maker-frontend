import FileInput from "@controls/FileInput";
import imageThumbnail from "@assets/image-thumbnail.svg";

const DragOverlay = ({
  visible,
  isFileDragged,
  target,
  onTargetSelected,
  onDragEnterLeave,
  onDragOver = (e) => e.preventDefault(),
  onDrop,
}) => {
  return (
    visible && (
      <div
        className="absolute w-full h-full inset-0"
        style={{
          fontFamily: "Inter",
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          onDragEnterLeave(e);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          onDragEnterLeave(e);
        }}
        onDragOver={(e) => {
          onDragOver(e);
        }}
        onDrop={(e) => {
          e.preventDefault();
          onDrop(e);
        }}
      >
        {!target && (
          <div
            className="card-overlay flex flex-col items-center justify-start m-2 xs:m-10 p-[20px] xs:p-[40px] rounded-lg border-2 border-dashed"
            style={{
              transition: "all 0.15s ease-out",
              borderColor: isFileDragged ? "#0c89f0" : "#aaaaaa",
              backgroundColor: isFileDragged
                ? "rgba(226, 241, 255, 0.3)"
                : "transparent",
              pointerEvents: isFileDragged ? "none" : "auto",
            }}
          >
            <div className="flex flex-col items-center justify-center xs:justify-start gap-0">
              <img
                src={imageThumbnail}
                className="w-[64px] h-[64px] mb-3 drop-shadow"
              />
              <h2 className="text-base xs:text-lg text-center">
                <span className="hidden xs:inline-block">
                  Drop your image here or
                </span>
                <span className="inline-block xs:hidden">
                  Upload a Photo from device
                </span>
                &nbsp;
                <FileInput
                  className="text-[#2a90ff] font-semibold underline"
                  text=" Upload"
                  onFileSelected={onTargetSelected}
                />
              </h2>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default DragOverlay;
