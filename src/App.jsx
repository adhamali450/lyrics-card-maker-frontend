import { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "./components/searchbar/Searchbar";

import { formatLyrics } from "./utils";
import LyricsViewer from "@components/lyrics-viewer/LyricsViewer";
import LyricsCard from "@components/lyrics-card/LyricsCard";

function App() {
  const [id, setId] = useState(0);

  const [song, setSong] = useState({});

  const [lyrics, setLyrics] = useState("");

  useEffect(() => {
    if (id == 0) return;

    setLyrics("");

    axios.get(`http://127.0.0.1:5000/api/song/${id}`).then((res) => {
      setLyrics(formatLyrics(res.data));
    });
  }, [id]);

  const handleResultSelected = (new_id) => {
    if (id == new_id) return;

    setId(new_id);
  };

  return (
    <div className="App p-5 grid grid-rows-[auto_1fr] grid-cols-[3fr_1fr] gap-5 h-[100vh]">
      <header className="col-span-2">
        <Searchbar onResultSelected={(id) => handleResultSelected(id)} />
      </header>
      <aside className="row-start-2 col-start-2 border-green-500 border overflow-auto">
        <LyricsViewer id={id} lyrics={lyrics} />
      </aside>
      <main className="row-start-2 col-start-1 border-blue-500 border">
        {/* <LyricsCard /> */}
      </main>
    </div>
  );
}

export default App;
