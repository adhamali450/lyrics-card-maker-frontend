import { useColor, usePalette } from "color-thief-react";
import { isArabic, shadeColor, lighterDarker } from "../utils";

const getPreviewGradient = (dominantColor, direction) => {
  if (!dominantColor) return;

  console.log(dominantColor);

  const lighterColor = shadeColor(dominantColor, 0.3);
  const darkerColor = shadeColor(dominantColor, -0.3);

  const grdDir = direction == "rtl" ? "left" : "right";
  const grd = `linear-gradient(to ${grdDir}, ${darkerColor}, ${lighterColor})`;

  return grd;
};

const SongPreview = ({ song }) => {
  const { title, artist, image } = song;

  const { data } = usePalette(image, 2, "hex", {
    crossOrigin: "anonymous",
    quality: 10,
  });

  const colors = data && lighterDarker(data[0], data[1]);

  return (
    <section
      className="flex items-center gap-3 shadow-md"
      style={{
        direction: isArabic(title) ? "rtl" : "ltr",
        background: getPreviewGradient(
          colors && colors[1],
          isArabic(title) ? "rtl" : "ltr"
        ),
        color: colors && colors[0],
      }}
    >
      <img className="w-[120px]" src={image} alt="song-cover" />
      <div className="flex flex-col gap-1">
        <h1 className="font-medium">{title}</h1>
        <h2 className="text-sm font-semibold">{artist}</h2>
      </div>
    </section>
  );
};

export default SongPreview;
