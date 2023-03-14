import React from "react";

const ImageInput = ({ className }) => {
  const changeHandler = (event) => {
    const files = event.target.files;

    for (const file of files) {
      // check if the selected file is an image
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
          const imgElement = document.createElement("img");
          imgElement.src = event.target.result;
          document.body.appendChild(imgElement);
        };
      }
    }
  };
  const dragEnterHandler = (e) => e.preventDefault();
  const dragOverHandler = (e) => e.preventDefault();
  const dropHandler = (event) => {
    event.preventDefault();
    console.log(event);

    const files = event.dataTransfer.files;
    const imageUrl = event.dataTransfer.getData("URL");

    if (imageUrl) {
      // handle image dragged from a browser tab
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      document.body.appendChild(imgElement);
    } else {
      // handle image(s) dragged from a file explorer or operating system window
      for (const file of files) {
        // check if the dropped file is an image
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = (event) => {
            const imgElement = document.createElement("img");
            imgElement.src = event.target.result;
            document.body.appendChild(imgElement);
          };
        }
      }
    }
  };

  return (
    <label
      htmlFor="dropzone-file"
      className={`${
        className ? className : ""
      } realtive flex flex-col items-center justify-center cursor-pointer z-10`}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          aria-hidden="true"
          className="w-10 h-10 mb-3 text-gray-400"
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
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
        <p className="text-xs text-gray-500 ">
          SVG, PNG, JPG or GIF (MAX. 800x400px)
        </p>
      </div>
      <input
        id="dropzone-file"
        type="file"
        dropzone="copy"
        className="absolute opacity-0 w-full h-full"
        onChange={(e) => changeHandler(e)}
        onDragEnter={(e) => dragEnterHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e)}
      />
    </label>
  );
};

export default ImageInput;
