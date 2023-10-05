import * as htmlToImage from "html-to-image";

const useCardToImage = (cardRef, scale = 1, quality = 1) => {
  return htmlToImage.toJpeg(cardRef.current, {
    width: cardRef.current.offsetWidth * scale,
    height: cardRef.current.offsetHeight * scale,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: "top left",
    },
    quality: quality,
  });
};

export default useCardToImage;
