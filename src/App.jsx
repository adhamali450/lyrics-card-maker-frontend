import { useState, useEffect } from "react";
import CardStyleContext from "@contexts/CardStyleContext";

import axios from "axios";
import _ from "lodash";
import Searchbar from "./components/searchbar/Searchbar";

import { formatLyrics, isArabic, getContrastColor } from "./utils";

import SongPreview from "@components/SongPreview";
import LyricsViewer from "@components/LyricsViewer";
import LyricsCard from "@components/lyrics-card/LyricsCard";

import logo from "@assets/logo.svg";
import OptionsPanel from "./components/OptionsPanel";

const defaultLyricsData = {
  lang: "",
  lyrics: [],
  selectionCompleted: false,
};

function App() {
  const [song, setSong] = useState({});
  const [colors, setColors] = useState(null);
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
        bannerForeground: getContrastColor(prev.bannerBackground),
        textColor: getContrastColor(prev.highlightColor),
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
        const lang = isArabic(res.data) ? "ar" : "en";
        setLyricsData({
          lang: lang,
          lyrics: formatLyrics(res.data)
            .split("\n")
            .map((l) => [l, 0]),
          selectionCompleted: false,
        });

        //TODO: Text alignment based on language
      });

    //colors
    axios
      .get("https://genius-unofficial-api.vercel.app/api/song/colors", {
        params: { url: image },
      })
      .then((res) => {
        setColors(res.data);
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
    <div className="App max-w-[1920px] max-h-[1080px] mx-auto p-5 grid grid-rows-[auto_1fr] grid-cols-[1fr_36ch] gap-5 h-[100vh]">
      <header className="col-span-2 flex gap-8 items-center">
        <img className="h-[70%]" src={logo} alt="Genius cards generator" />
        <Searchbar
          className="grow"
          onResultSelected={(id) => handleResultSelected(id)}
        />
      </header>

      <aside className="row-start-2 col-start-2 border-green-500 border flex flex-col overflow-auto">
        {!_.isEqual(song, {}) && <SongPreview song={song} colors={colors} />}

        <LyricsViewer
          className="border grow "
          id={id}
          colors={colors}
          lyricsData={lyricsData}
          onSelectionChanged={handleSelectionChanged}
        />
      </aside>
      <main className="row-start-2 col-start-1 border-blue-500 border">
        <CardStyleContext.Provider value={{ cardStyling, setCardStyling }}>
          <OptionsPanel />
          <LyricsCard cardInfo={song} lyricsData={lyricsData} />
        </CardStyleContext.Provider>
      </main>
    </div>
  );
}

export default App;
