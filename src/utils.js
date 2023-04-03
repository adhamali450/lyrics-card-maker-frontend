import axios from "axios";

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

export const isArabic = (str) => {
  let arabic = /[\u0600-\u06FF]/;

  // [Approach 1]: Take 5 random characters from the string
  // const samples = [];

  // for (let i = 0; i < 5; i++)
  //   samples.push(str[rangedRandom(0, str.length - 1)]);

  // return (
  //   samples.map((c) => arabic.test(c)).filter((c) => c === true).length > 3
  // );

  // [Approach 2]: If any character is arabic, then the whole string is arabic
  return str.split("").some((c) => arabic.test(c));
};

export const shadeColor = (color, percent) => {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.round(R * (1 + percent));
  G = Math.round(G * (1 + percent));
  B = Math.round(B * (1 + percent));

  R = R < 255 ? (R < 0 ? 0 : R) : 255;
  G = G < 255 ? (G < 0 ? 0 : G) : 255;
  B = B < 255 ? (B < 0 ? 0 : B) : 255;

  const RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  const GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  const BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return `#${RR}${GG}${BB}`;
};

export const lighterDarker = (color1, color2) => {
  if (!color1 || !color2) return [color1, color2];

  // Convert color strings to RGB arrays
  const rgb1 = color1.match(/\d+/g).map(Number);
  const rgb2 = color2.match(/\d+/g).map(Number);

  // Calculate the perceived luminance for each color using the formula: L = 0.2126*R + 0.7152*G + 0.0722*B
  const luminance1 = 0.2126 * rgb1[0] + 0.7152 * rgb1[1] + 0.0722 * rgb1[2];
  const luminance2 = 0.2126 * rgb2[0] + 0.7152 * rgb2[1] + 0.0722 * rgb2[2];

  // Compare the luminance values to determine which color is lighter
  return luminance1 > luminance2 ? [color1, color2] : [color2, color1];
};

export const getContrastColor = (color) => {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);

  const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return l > 70 ? "#000000" : "#ffffff";
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
