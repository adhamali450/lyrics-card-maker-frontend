import React from "react";
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
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <h2 className="text-base xs:text-lg">
                <span className="hidden xs:inline-block">
                  Drag and drop a photo
                </span>
                <span className="inline-block xs:hidden">
                  Upload a Photo from device
                </span>
              </h2>
            </div>
            <div className="mt-3 flex justify-center items-center gap-3">
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
