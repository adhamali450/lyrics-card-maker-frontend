import { useState, useEffect } from "react";

import axios from "axios";
import _ from "lodash";
import Searchbar from "./components/searchbar/Searchbar";

import { formatLyrics } from "./utils";

import SongPreview from "@components/SongPreview";
import LyricsViewer from "@components/LyricsViewer";
import LyricsCard from "@components/lyrics-card/LyricsCard";

function App() {
  const [song, setSong] = useState({});

  const { id } = song;

  const [lyrics, setLyrics] = useState("");

  useEffect(() => {
    if (_.isEqual(song, {})) return;

    setLyrics("");

    axios
      .get(`https://genius-unofficial-api.vercel.app/api/song/${id}`)
      .then((res) => {
        setLyrics(formatLyrics(res.data));
      });
  }, [song]);

  const handleResultSelected = (newSong) => {
    if (song == newSong) return;

    setSong(newSong);
  };

  return (
    <div className="App p-5 grid grid-rows-[auto_1fr] grid-cols-[3fr_1fr] gap-5 h-[100vh]">
      <header className="col-span-2">
        <Searchbar onResultSelected={(id) => handleResultSelected(id)} />
      </header>

      <aside className="row-start-2 col-start-2 border-green-500 border flex flex-col overflow-auto">
        {!_.isEqual(song, {}) && <SongPreview song={song} />}

        <LyricsViewer className="border grow" id={id} lyrics={lyrics} />
      </aside>
      <main className="row-start-2 col-start-1 border-blue-500 border">
        <LyricsCard cardInfo={song} />
      </main>
    </div>
  );
}

export default App;
