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

export const getLang = (str) => {
  let arabic = /[\u0600-\u06FF]/;

  return str.split("").some((c) => arabic.test(c)) ? "ar" : "en";
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

export const barToLines = (bar, lineMax = 36) => {
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
