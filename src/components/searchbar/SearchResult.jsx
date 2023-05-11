import BrokenImg from "@assets/broken-image.png";
import { truncate, isImageLink } from "../../utils";

const SearchResult = ({ className, img, songName, artistName, onClick }) => {
  return (
    <button
      className={`${className}`}
      type="button"
      title={`${songName},\r${artistName}`}
      onClick={onClick}
    >
      <div className="flex gap-1 items-center">
        <img
          className="w-[80px] aspect-square object-scale-down"
          src={isImageLink(img) ? img : BrokenImg}
          alt="song-cover"
        />
        <div className="flex flex-col items-start text-start px-2">
          <p>{truncate(songName, 35)}</p>
          <small className="font-semibold">{truncate(artistName, 25)}</small>
        </div>
      </div>
    </button>
  );
};

export default SearchResult;
