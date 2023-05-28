const arabicRegex = /[\u0600-\u06FF]/;
const englishRegex = /[A-Za-z]/;

/**

Determines the language of the given lyrics based on the occurrence of Arabic and English characters.
@param {string} lyrics - The lyrics text to analyze.
@returns {string} - Returns "ar" for Arabic if the Arabic character count is higher, or "en" for English otherwise.
*/
const getLang = (lyrics) => {
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

/**

Checks if a given string contains characters belonging to a specific language.
@param {string} str - The input string to check.
@param {string} lang - The language code to compare against. Can be "en" for English or "ar" for Arabic.
@returns {boolean} - Returns true if the string contains characters of the specified language, otherwise false.
@throws {Error} - Throws an error if an invalid language code is provided.
*/
const containsLang = (str, lang) => {
  if (lang === "en") {
    return englishRegex.test(str);
  } else if (lang === "ar") {
    return arabicRegex.test(str);
  } else {
    throw new Error(`Invalid language code: ${lang}`);
  }
};

/**

Breaks a given bar of text into multiple lines based on a maximum line length.
@param {string} bar - The input bar of text to be divided into lines.
@param {number} lineMax - The maximum length of each line. If not provided, the original bar will be returned as a single line.
@returns {string[]} - An array of lines, where each line contains a portion of the original bar text.
*/
const barToLines = (bar, lineMax) => {
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

/**
 * Calculates the maximum number of characters that can fit in a container element based on its width.
 *
 * @param {HTMLElement} container - The container element in which the text will be displayed.
 * @returns {Object} - An object containing the maximum number of characters for different aspect ratios, based on the container width.
 *                     The keys of the object represent the aspect ratios in the format "width:height" (e.g., "1:1", "3:4", "4:3"),
 *                     and the values represent the corresponding maximum number of characters.
 */
const getMaxCharacters = (container, fontSizeClassName) => {
  // 1- Create a temporary span element (reference)
  const tempSpan = document.createElement("span");

  tempSpan.innerText = "A"; // Use a representative character
  tempSpan.classList.add(fontSizeClassName);
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

/**
 * Extracts the English part from a string that contains both Arabic and English text.
 *
 * @param {string} str - The input string containing Arabic and English text.
 * @returns {string} - The extracted English part of the string, if found. Otherwise, returns the original string.
 */
const extractEnglishFromArabic = (str) => {
  const regex = /[a-zA-Z]+\s*(-|\|)\s*[\u0600-\u06FF]/;
  const match = str.match(regex);

  if (match) {
    // Extract the English part before the separator
    const separator = match[1];
    const index = str.indexOf(separator);
    return str.substring(0, index);
  } else {
    return str;
  }
};

/**
 * Formats lyrics by removing unnecessary lines and text.
 *
 * @param {string} lyrics - The lyrics to be formatted.
 * @returns {string} - The formatted lyrics.
 */
const formatLyrics = (lyrics) => {
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

/**
 * Formats credits by extracting the English part from Arabic-English credits.
 *
 * @param {string} credit - The credit string containing Arabic and English text.
 * @returns {string} - The formatted credit string with only the English part.
 */
const formatCredits = (credit) => {
  credit = extractEnglishFromArabic(credit);

  return credit;
};

export {
  getLang,
  containsLang,
  barToLines,
  getMaxCharacters,
  formatLyrics,
  formatCredits,
};
