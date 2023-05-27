import { getPalette } from "color-thief-react";
import routes from "@/js/api/routes";

/**

Checks if a given URL is an image link.
@param {string} url - The URL to be checked.
@returns {boolean} - Returns true if the URL ends with .jpeg, .jpg, .gif, or .png (case insensitive), indicating it is an image link. Returns false otherwise.
*/
const isImageLink = (url) => url.match(/\.(jpeg|jpg|gif|png)$/) != null;

/**

Retrieves an upscaled version of an image from a given URL.
@param {string} url - The URL of the image to be upscaled.
@param {Function} callback - The callback function to handle the upscaled image data.
@returns {Promise<void>} - A promise that resolves once the upscaled image data has been retrieved and passed to the callback function.
*/
const getUpscaledImage = async (url, callback) => {
  // Try to get the maximum resolution from Genius (It's not always 300x300)
  for (let resolution of ["1000x1000", "500x500", "300x300"]) {
    try {
      const res = await routes.getCORSImage(url.replace("300x300", resolution));
      callback(res.data);
      break;
    } catch (error) {
      continue;
    }
  }
};

/**

Retrieves the color palette of an image from a given URL.
@param {string} url - The URL of the image to extract the color palette from.
@param {Function} callback - The callback function to handle the extracted color palette.
@returns {void}
*/
const getImagePalette = (url, callback) => {
  // First, use color-thief to get the dominant color
  // If failed, use the backend API

  getPalette(url, 2, "hex", "anonymous")
    .then((colors) => {
      callback(colors[0]);
    })
    .catch(() => {
      // Fallback to backend API
      routes
        .getColors(url)
        .then((res) => {
          callback(res.data["background_color"]);
        })
        .catch(() => {
          console.error("Couldn't get image palette");
        });
    });
};

export { isImageLink, getUpscaledImage, getImagePalette };
