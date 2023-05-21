import routes from "@/js/api/routes";
import { getPalette } from "color-thief-react";
const arabicRegex = /[\u0600-\u06FF]/;
const englishRegex = /[A-Za-z]/;

export const truncate = (str, length = 35) => {
  if (str.length > length) return str.slice(0, length) + "...";
  else return str;
};

export const formatLyrics = (lyrics) => {
  lyrics = lyrics
    .replace(/Translations.*/gi, "")
    .replace(/Lyrics.*/gi, "")
    .replace(/\[.*\]/gi, ".")
    .replace("Embed", "")
    .replace("You might also like", "");

  // Remove empty lines along with the first line (which is usually the song name)
  lyrics = lyrics
    .split("\n")
    .filter((l, i) => i != 0 && l != "" && l != ".")
    .join("\n");

  return lyrics;
};
export const isImageLink = (url) => url.match(/\.(jpeg|jpg|gif|png)$/) != null;

export const rangedRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getLang = (lyrics) => {
  let arabicCount = 0;
  let englishCount = 0;

  for (let i = 0; i < lyrics.length; i++) {
    if (arabicRegex.test(lyrics[i])) {
      arabicCount++;
    } else if (englishRegex.test(lyrics[i])) {
      englishCount++;
    }
  }

  return arabicCount > englishCount ? "ar" : "en";
};

export const containsLang = (str, lang) => {
  if (lang === "en") {
    return englishRegex.test(str);
  } else if (lang === "ar") {
    return arabicRegex.test(str);
  } else {
    throw new Error(`Invalid language code: ${lang}`);
  }
};

export const shadeColor = (color, percent) => {
  let [r, g, b] = hexToRgb(color);

  r = Math.round(r * (1 + percent));
  g = Math.round(g * (1 + percent));
  b = Math.round(b * (1 + percent));

  r = r < 255 ? (r < 0 ? 0 : r) : 255;
  g = g < 255 ? (g < 0 ? 0 : g) : 255;
  b = b < 255 ? (b < 0 ? 0 : b) : 255;

  const rr = r.toString(16).length == 1 ? "0" + r.toString(16) : r.toString(16);
  const gg = g.toString(16).length == 1 ? "0" + g.toString(16) : g.toString(16);
  const bb = b.toString(16).length == 1 ? "0" + b.toString(16) : b.toString(16);

  return `#${rr}${gg}${bb}`;
};

export const getContrastColor = (color) => {
  const l = luminance(color) * 100;

  return l > 70 ? "#000000" : "#ffffff";
};

export const bestContrast = (backgroundColor, candidates) => {
  const contrasts = candidates.map((c) => [
    c,
    getContrast(backgroundColor, c, true),
  ]);
  contrasts.sort((a, b) => b[1] - a[1]);

  return contrasts[0][0];
};

// Helper function to convert hex color to RGB values
const hexToRgb = (hex) => {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  return [r, g, b];
};

export const rgbToHex = (r, g, b, a) => {
  const red = r.toString(16).padStart(2, "0");
  const green = g.toString(16).padStart(2, "0");
  const blue = b.toString(16).padStart(2, "0");
  const alpha = Math.round(a * 255)
    .toString(16)
    .padStart(2, "0");

  // Combine the hex codes into a single string
  const hex = `#${red}${green}${blue}${alpha}`;

  return hex;
};

// Calculate the relative luminance of a color using the formula from WCAG
const luminance = (color) => {
  const rgb = hexToRgb(color);
  const r = rgb[0] / 255,
    g = rgb[1] / 255,
    b = rgb[2] / 255;
  const gammaR = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4),
    gammaG = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4),
    gammaB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  return 0.2126 * gammaR + 0.7152 * gammaG + 0.0722 * gammaB;
};

// Calculate the contrast ratio using the relative luminance of each color
export const getContrast = (background, foreground, numeric = false) => {
  const l1 = luminance(background);
  const l2 = luminance(foreground);

  if (l1 > l2) var contrast = (l1 + 0.05) / (l2 + 0.05);
  else var contrast = (l2 + 0.05) / (l1 + 0.05);

  if (numeric) return contrast;

  // Determine if the contrast meets the WCAG AA or AAA standard
  if (contrast >= 4.5) {
    return "AAA";
  } else if (contrast >= 3) {
    return "AA";
  } else {
    return "fail";
  }
};

export const barToLines = (bar, lineMax) => {
  if (!lineMax) return [bar];

  const words = bar.split(" ");
  const chunks = [];
  let currentChunk = "";

  for (const word of words) {
    if (currentChunk.length + word.length + 1 <= lineMax) {
      currentChunk += (currentChunk === "" ? "" : " ") + word;
    } else {
      chunks.push(currentChunk);
      currentChunk = word;
    }
  }

  if (currentChunk !== "") {
    chunks.push(currentChunk);
  }

  return chunks;
};

export const getPreviewGradient = (dominantColor, direction) => {
  if (!dominantColor) return;

  const lighterColor = shadeColor(dominantColor, 0.3);
  const darkerColor = shadeColor(dominantColor, -0.3);

  const grdDir = direction == "rtl" ? "left" : "right";
  const grd = `linear-gradient(to ${grdDir}, ${darkerColor}, ${lighterColor})`;

  return grd;
};

const download = (href, filename) => {
  const element = document.createElement("a");
  element.href = href;
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const getUpscaledImage = async (url, callback) => {
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

export const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(new Blob([blob]));
  download(url, filename);
};

export const getImagePalette = (url, callback) => {
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

export const getMaxCharacters = (container) => {
  // 1- Create a temporary span element (reference)
  const tempSpan = document.createElement("span");

  tempSpan.innerText = "A"; // Use a representative character
  tempSpan.classList.add("fallback-editiable-label");
  tempSpan.style.position = "absolute";
  tempSpan.style.visibility = "hidden";
  document.body.appendChild(tempSpan);

  // 2- Calculate the maximum number of characters that can fit in the container
  const charWidth = tempSpan.getBoundingClientRect().width;
  const containerWidth = container.getBoundingClientRect().width;

  const widths = {
    "1:1": containerWidth,
    "3:4": containerWidth * (3 / 4),
    "4:3": containerWidth * (4 / 3),
  };

  // 3- Remove the temporary span element
  document.body.removeChild(tempSpan);

  return Object.keys(widths).reduce((result, ratio) => {
    result[ratio] = Math.floor((widths[ratio] / charWidth) * 1.2);
    return result;
  }, {});
};

// TODO
export const formatCredits = (credit, lang) => {
  return credit;
};
