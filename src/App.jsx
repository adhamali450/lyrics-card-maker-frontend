import { useState, useEffect, Fragment, useRef } from "react";
import CardStyleContext from "@contexts/CardStyleContext";

import axios from "axios";
import _ from "lodash";
import Searchbar from "./components/searchbar/Searchbar";

import {
  formatLyrics,
  getLang,
  getContrastColor,
  bestContrast,
  getContrast,
} from "./utils";

import SongPreview from "@components/SongPreview";
import LyricsViewer from "@components/LyricsViewer";
import LyricsCard from "@components/lyrics-card/LyricsCard";
import CardSymbol from "@utils/CardSymbol";

import PageLogo from "@utils/PageLogo";
import OptionsPanel from "./components/OptionsPanel";
import LyricsModal from "./components/LyricsModal";

const defaultLyricsData = {
  lang: "",
  lyrics: [],
  selectionCompleted: false,
};

function App() {
  const [song, setSong] = useState({});
  const [colors, setColors] = useState(null);
  const [cardAspectRatio, setCardAspectRatio] = useState("1:1");
  const [cardStyling, setCardStyling] = useState({
    bold: false,
    italic: false,
    alignment: "left",
    highlightColor: "#ffffff",
    textColor: "#000000",
    bannerBackground: "#f7f16c",
    bannerForeground: "#000000",
  });

  // Setting a proper foreground color for the background color
  useEffect(() => {
    setCardStyling((prev) => {
      return {
        ...prev,
        bannerForeground: bestContrast(prev.bannerBackground, [
          "#000000",
          "#ffffff",
        ]),
        textColor: bestContrast(prev.highlightColor, ["#000000", "#ffffff"]),
      };
    });
  }, [cardStyling.bannerBackground, cardStyling.highlightColor]);

  const [lyricsData, setLyricsData] = useState(defaultLyricsData);

  const { id, image } = song;

  // Whenever a song is selected, fetch lyrics and colors
  useEffect(() => {
    if (_.isEqual(song, {})) return;

    setLyricsData(defaultLyricsData);
    setColors(null);

    // lyrics
    axios
      .get(`https://genius-unofficial-api.vercel.app/api/song/lyrics/${id}`)
      .then((res) => {
        const lang = getLang(res.data);
        setLyricsData({
          lang: lang,
          lyrics: formatLyrics(res.data)
            .split("\n")
            .map((l) => [l, 0]),
          selectionCompleted: false,
        });
      })
      .then(() => {});

    //colors
    axios
      .get("https://genius-unofficial-api.vercel.app/api/song/colors", {
        params: { url: image },
      })
      .then((res) => {
        let { background_color, text_color } = res.data;

        if (getContrast(background_color, text_color, true) <= 2) {
          text_color = bestContrast(background_color, ["#000000", "#ffffff"]);
        }

        setColors({
          background_color: background_color,
          text_color: text_color,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [song]);

  const handleResultSelected = (newSong) => {
    if (song == newSong) return;

    setSong(newSong);
  };

  const handleSelectionChanged = (index) => {
    setLyricsData((prev) => {
      const newLyrics = prev.lyrics.map((l, i) => {
        if (i == index) return [l[0], l[1] == 0 ? 1 : 0];
        return l;
      });

      const selectedCount = newLyrics.filter((l) => l[1] == 1).length;

      return {
        ...prev,
        lyrics: newLyrics,
        selectionCompleted: selectedCount == 4,
      };
    });
  };

  return (
    <div className="App relative container max-w-[1920px] max-h-[1080px] mx-auto flex h-[100vh]">
      <LyricsModal
        song={song}
        colors={colors}
        lyricsData={lyricsData}
        onLyricsSelectionChanged={handleSelectionChanged}
      />

      <aside className="hidden lg:grid grid-rows-[5rem_1fr] p-5 gap-7 h-full bg-[#272838]">
        <PageLogo className="h-[70%] self-center" />
        <section className="flex items-center flex-col gap-2">
          {[
            ["1:1", "Facebook"],
            ["3:4", "Instagram"],
            ["4:3", "Twitter"],
          ].map(([ratio, title], index, len) => (
            <button
              className="px-2 aspect-square rounded-lg w-[100px]"
              key={index + "-button"}
              style={{}}
              onClick={() => setCardAspectRatio(ratio)}
            >
              <CardSymbol
                style={{
                  opacity: cardAspectRatio == ratio ? 1 : 0.5,
                }}
                aspectRatio={ratio}
                state={cardAspectRatio == ratio ? "active" : "inactive"}
              />
              <span className="text-sm text-[#e0eafb]">{title}</span>
            </button>
          ))}
        </section>
      </aside>

      <main className="grow grid grid-rows-[5rem_1fr] grid-cols-[1fr] lg:grid-cols-[1fr_36ch] p-5 gap-5">
        <header className="lg:col-span-2 flex gap-4 sm:gap-8 items-center">
          <PageLogo
            className="block lg:hidden h-[60%] sm:h-[70%] self-center"
            geniusColor="#272838"
          />
          <Searchbar
            className="grow"
            onResultSelected={(id) => handleResultSelected(id)}
          />
        </header>

        <section className="row-start-2">
          <CardStyleContext.Provider value={{ cardStyling, setCardStyling }}>
            <OptionsPanel className="h-12 px-6 gap-5 rounded-md mb-4 border border-gray-400 bg-[#eeeeee]" />
            <LyricsCard
              cardInfo={song}
              lyricsData={lyricsData}
              aspectRatio={cardAspectRatio}
            />
          </CardStyleContext.Provider>
        </section>

        <aside className="row-start-2 col-start-2 hidden lg:grid grid-rows-[120px_1fr] border border-gray-400 rounded-md overflow-auto">
          {!_.isEqual(song, {}) && (
            <SongPreview className="row-start-1" song={song} colors={colors} />
          )}

          <LyricsViewer
            className="grow"
            style={{
              gridRow: !_.isEqual(song, {}) ? "2/3" : "1/3",
            }}
            id={id}
            colors={colors}
            lyricsData={lyricsData}
            lineMax={36}
            onSelectionChanged={handleSelectionChanged}
          />
        </aside>
      </main>
    </div>
  );
}

export default App;
