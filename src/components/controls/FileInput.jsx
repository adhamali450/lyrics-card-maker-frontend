import { Fragment } from "react";

const FileInput = ({
  className,
  onFileSelected = () => {},
  text = "Upload a file",
  children,
}) => {
  const fileSelectedHandler = (e) => {
    const file = e.target.files[0];

    const url = URL.createObjectURL(file);

    onFileSelected(url);
  };
  return (
    <Fragment>
      <label
        htmlFor="file-input"
        className={`${className} inline-block cursor-pointer`}
      >
        {children || text}
      </label>
      <input
        id="file-input"
        className="hidden"
        type="file"
        onChange={fileSelectedHandler}
      />
    </Fragment>
  );
};

export default FileInput;
