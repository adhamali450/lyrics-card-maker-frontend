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
            className="flex flex-col items-center justify-start m-10 py-[40px] rounded-lg border-2 border-dashed"
            style={{
              transition: "all 0.15s ease-in-out",
              borderColor: isFileDragged ? "#0c89f0" : "#aaaaaa",
              backgroundColor: isFileDragged ? "#e2f1ff" : "transparent",
              pointerEvents: isFileDragged ? "none" : "auto",
            }}
          >
            <img className="w-[70px]" src={iconUploadToCloud} alt="upload" />
            <h2 className="mt-1 text-lg font-medium text">
              Drag and drop a photo
            </h2>
            <div className="mt-5 flex justify-center items-center gap-3">
              <span className="text-sm">or</span>

              <FileInput
                className="shadow-sm shadow-[#bdc1c5] border-[1.5px] border-[#969ca2] bg-gray-300"
                text="Upload a photo"
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
