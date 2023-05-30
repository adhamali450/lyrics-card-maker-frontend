export * from "./lyrics";
export * from "./colors";
export * from "./images";

/**

Truncates a string if it exceeds a specified length.
@param {string} str - The input string to be truncated.
@param {number} [length=35] - The maximum length of the truncated string. Defaults to 35 if not provided.
@returns {string} - The truncated string, with ellipsis (...) appended if necessary.
*/
export const truncate = (str, length = 35) => {
  if (str.length > length) return str.slice(0, length) + "...";
  else return str;
};

/**

Downloads a file by creating a temporary link element and triggering a download.
@param {string} href - The URL or data URI of the file to be downloaded.
@param {string} filename - The desired filename of the downloaded file.
@returns {void}
*/
const download = (href, filename) => {
  const element = document.createElement("a");
  element.href = href;
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

/**

Downloads a blob (binary large object) as a file.
@param {Blob} blob - The blob object to be downloaded.
@param {string} filename - The desired filename of the downloaded file.
@returns {void}
*/
export const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(new Blob([blob]));
  download(url, filename);
};

/**
 * Triggers callback functions based on the width of a DOM element.
 *
 * @param {Object} ref - The ref object containing the DOM element.
 * @param {Number} actual - The actual width of the DOM element (used instead of ref).
 * @param {String} operator - The operator to use for comparison (>=, <, etc...).
 * @param {Object} dict - An object with width thresholds as keys and callback functions as values.

 * @returns {void}
 */
export const onWidth = ({ ref, actual, operator = ">=", dict } = {}) => {
  if (ref && ref.current) actual = ref.current.offsetWidth;

  Object.entries(dict).forEach(([key, value]) => {
    if (eval(actual + operator + key)) {
      value();
    }
  });
};

export const objectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
