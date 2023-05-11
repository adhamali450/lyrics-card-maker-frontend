import React from "react";
import iconUploadToCloud from "@assets/icon-upload-to-cloud.png";
import FileInput from "@controls/FileInput";

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
            className="hide-when-download flex flex-col items-center justify-start m-2 xs:m-10 p-[10px] xs:p-[40px] rounded-lg border-2 border-dashed"
            style={{
              transition: "all 0.15s ease-out",
              borderColor: isFileDragged ? "#0c89f0" : "#aaaaaa",
              backgroundColor: isFileDragged
                ? "rgba(226, 241, 255, 0.3)"
                : "transparent",
              pointerEvents: isFileDragged ? "none" : "auto",
            }}
          >
            <div className="flex flex-row xs:flex-col items-center justify-center xs:justify-start gap-3 xs:gap-0">
              <img
                className="w-[45px] xs:w-[70px] h-[45px] xs:h-[70px]"
                src={iconUploadToCloud}
                alt="upload"
              />
              <h2 className="mt-1 text-base xs:text-lg font-medium text">
                <span className="hidden xs:inline-block">
                  Drag and drop a photo
                </span>
                <span className="inline-block xs:hidden">
                  Upload a Photo from device
                </span>
              </h2>
            </div>
            <div className="mt-2 xs:mt-5 flex justify-center items-center gap-3">
              <small className="hidden xs:inline-block text-sm">or</small>

              <FileInput
                className="shadow-sm shadow-[#bdc1c5] border-[1.5px] rounded-[4px] px-3 py-[2px] border-[#969ca2] bg-gray-300"
                text="Choose photo"
                onFileSelected={onTargetSelected}
              />
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default DragOverlay;
