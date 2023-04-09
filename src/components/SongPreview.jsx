import { Fragment, useEffect } from "react";

import iconBrokenImage from "@assets/broken-image.png";
import SongPreviewSkeleton from "@skeletons/SongPreviewSkeleton";

import {
  getLang,
  shadeColor,
  truncate,
  isImageLink,
  getContrast,
  bestContrast,
} from "@/utils";

const getPreviewGradient = (dominantColor, direction) => {
  if (!dominantColor) return;

  const lighterColor = shadeColor(dominantColor, 0.3);
  const darkerColor = shadeColor(dominantColor, -0.3);

  const grdDir = direction == "rtl" ? "left" : "right";
  const grd = `linear-gradient(to ${grdDir}, ${darkerColor}, ${lighterColor})`;

  return grd;
};

const SongPreview = ({ className = "h-[120px]", song, colors }) => {
  const { title, artist, image } = song;

  useEffect(() => {
    if (colors) {
      getContrast(colors["background_color"], colors["text_color"]);
    }
  }, [colors]);

  return (
    <section
      className={`${className} relative flex items-center w-full gap-3 shadow-md `}
      style={{
        direction: getLang(title) == "ar" ? "rtl" : "ltr",
        textAlign: getLang(title) == "ar" ? "right" : "left",
        background: getPreviewGradient(
          colors && colors["background_color"],
          getLang(title) == "ar" ? "rtl" : "ltr"
        ),
        color: colors && colors["text_color"],
      }}
    >
      {colors && (
        <Fragment>
          <img
            className="h-full aspect-square object-cover"
            src={isImageLink(image) ? image : iconBrokenImage}
            alt="song-cover"
          />

          <img
            className="absolute w-full h-full object-cover opacity-[0.07] pointer-events-none"
            src={isImageLink(image) ? image : iconBrokenImage}
            alt=""
          />

          <div className="flex flex-col gap-1 py-5">
            <h1 className="font-medium">{truncate(title)}</h1>
            <h2 className="text-sm font-semibold">{truncate(artist)}</h2>
          </div>
        </Fragment>
      )}
      {!colors && <SongPreviewSkeleton className="px-3 pt-3 pb-4 h-full" />}
    </section>
  );
};

export default SongPreview;
