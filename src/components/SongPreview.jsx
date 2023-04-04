import { Fragment } from "react";

import LoadingAnimation from "@components/utils/LoadingAnimation";
import iconBrokenImage from "@assets/broken-image.png";

import { getLang, shadeColor, truncate, isImageLink } from "@/utils";

const getPreviewGradient = (dominantColor, direction) => {
  if (!dominantColor) return;

  const lighterColor = shadeColor(dominantColor, 0.3);
  const darkerColor = shadeColor(dominantColor, -0.3);

  const grdDir = direction == "rtl" ? "left" : "right";
  const grd = `linear-gradient(to ${grdDir}, ${darkerColor}, ${lighterColor})`;

  return grd;
};

const SongPreview = ({ song, colors }) => {
  const { title, artist, image } = song;

  return (
    <section
      className="relative flex items-center gap-3  shadow-md w-full h-[120px]"
      style={{
        direction: getLang(title) == "ar" ? "rtl" : "ltr",
        background: getPreviewGradient(
          colors && colors["text_color"],
          getLang(title) == "ar" ? "rtl" : "ltr"
        ),
        color: colors && colors["background_color"],
      }}
    >
      {colors && (
        <Fragment>
          <img
            className="w-[120px] h-full object-cover"
            src={isImageLink(image) ? image : iconBrokenImage}
            alt="song-cover"
          />

          <img
            className="absolute w-full h-full object-cover opacity-5 pointer-events-none"
            src={isImageLink(image) ? image : iconBrokenImage}
            alt=""
          />

          <div className="flex flex-col gap-1 py-5">
            <h1 className="font-medium">{truncate(title)}</h1>
            <h2 className="text-sm font-semibold">{truncate(artist)}</h2>
          </div>
        </Fragment>
      )}

      {!colors && <LoadingAnimation />}
    </section>
  );
};

export default SongPreview;
