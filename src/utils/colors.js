/**

Shades a color by a specified percentage.
@param {string} color - The color in hexadecimal format (e.g., "#RRGGBB") to be shaded.
@param {number} percent - The percentage by which to shade the color. Positive values make it lighter, negative values make it darker.
@returns {string} - The shaded color in hexadecimal format (e.g., "#RRGGBB").
*/
const shadeColor = (color, percent) => {
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

/**

Retrieves the contrast color (either black or white) based on the given background color.
@param {string} color - The background color in hexadecimal format (e.g., "#RRGGBB").
@returns {string} - The contrast color in hexadecimal format (e.g., "#RRGGBB").
*/
const getContrastColor = (color) => {
  const l = luminance(color) * 100;

  return l > 70 ? "#000000" : "#ffffff";
};

/**

Finds the color with the best contrast to a given background color among a list of candidate colors.
@param {string} backgroundColor - The background color in hexadecimal format (e.g., "#RRGGBB").
@param {string[]} candidates - An array of candidate colors to compare for contrast.
@returns {string} - The color from the candidate list with the highest contrast to the background color.
*/
const bestContrast = (backgroundColor, candidates) => {
  const contrasts = candidates.map((c) => [
    c,
    getContrast(backgroundColor, c, true),
  ]);
  contrasts.sort((a, b) => b[1] - a[1]);

  return contrasts[0][0];
};

/**

Converts a hexadecimal color representation to its RGB equivalent.
@param {string} hex - The hexadecimal color string (e.g., "#RRGGBB") to be converted.
@returns {number[]} - An array containing the RGB values [r, g, b] of the converted color.
*/
const hexToRgb = (hex) => {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  return [r, g, b];
};

/**

Converts RGB (Red, Green, Blue) color values to a hexadecimal color representation.
@param {number} r - The red color value (0-255).
@param {number} g - The green color value (0-255).
@param {number} b - The blue color value (0-255).
@param {number} [a] - The alpha (opacity) value (0-1). Optional. Defaults to 1 (fully opaque) if not provided.
@returns {string} - The hexadecimal color string (e.g., "#RRGGBBAA") representing the RGB color.
*/
const rgbToHex = (r, g, b, a) => {
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

/**

Calculates the luminance of a given color.
@param {string} color - The color in hexadecimal format (e.g., "#RRGGBB") for which to calculate the luminance.
@returns {number} - The luminance value of the color, ranging from 0 to 1.
*/
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

/**

Calculates the contrast ratio between a background color and a foreground color.
@param {string} background - The background color in hexadecimal format (e.g., "#RRGGBB").
@param {string} foreground - The foreground color in hexadecimal format (e.g., "#RRGGBB").
@param {boolean} [numeric=false] - Specifies whether to return the numeric contrast ratio or the WCAG standard (either "AAA", "AA", or "fail"). Optional. Defaults to false.
@returns {number|string} - The contrast ratio between the background and foreground colors, or the WCAG standard if numeric is set to false.
*/
const getContrast = (background, foreground, numeric = false) => {
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

/**

Generates a preview gradient for a given dominant color and direction.
@param {string} dominantColor - The dominant color in hexadecimal format (e.g., "#RRGGBB") to generate the gradient.
@param {string} direction - The direction of the gradient. Can be "rtl" (right to left) or any other value for left to right.
@returns {string|undefined} - The CSS linear gradient string representing the preview gradient, or undefined if dominantColor is falsy.
*/
const getPreviewGradient = (dominantColor, direction) => {
  if (!dominantColor) return;

  const lighterColor = shadeColor(dominantColor, 0.3);
  const darkerColor = shadeColor(dominantColor, -0.3);

  const grdDir = direction == "rtl" ? "left" : "right";
  const grd = `linear-gradient(to ${grdDir}, ${darkerColor}, ${lighterColor})`;

  return grd;
};

export {
  shadeColor,
  getContrastColor,
  bestContrast,
  hexToRgb,
  rgbToHex,
  luminance,
  getContrast,
  getPreviewGradient,
};
