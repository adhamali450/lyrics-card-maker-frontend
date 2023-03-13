export const truncate = (str, length) => {
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
    .filter((l, i) => i != 0 && l != "")
    .join("\n");

  return lyrics;
};

export const isImageLink = (url) => url.match(/\.(jpeg|jpg|gif|png)$/) != null;

export const rangedRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const isArabic = (str) => {
  let arabic = /[\u0600-\u06FF]/;

  // Take 5 random characters from the string
  const samples = [];

  for (let i = 0; i < 5; i++)
    samples.push(str[rangedRandom(0, str.length - 1)]);

  return (
    samples.map((c) => arabic.test(c)).filter((c) => c === true).length > 3
  );
};
