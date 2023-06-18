import { useState, useEffect, useRef, lazy, Suspense } from "react";
import CardStyleContext from "@contexts/CardStyleContext";

import routes from "@/js/api/routes";

import { objectEmpty } from "@utils";
import DomToImage from "dom-to-image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useWindowSize } from "@uidotdev/usehooks";

// import iconDownload from "@assets/icon-download.svg";
// import iconShare from "@assets/icon-share.svg";

import {
  formatLyrics,
  getLang,
  bestContrast,
  getContrast,
  downloadBlob,
} from "./utils";

import Searchbar from "@components/searchbar/Searchbar";
const SongPreview = lazy(() => import("@components/SongPreview"));
import LyricsViewer from "@components/LyricsViewer";
import LyricsCard from "@components/lyrics-card/LyricsCard";
import SizeMenu from "@compUtils/SizeMenu";
import PageLogo from "@compUtils/PageLogo";
import OptionsPanel from "@components/OptionsPanel";
// const LyricsModal = lazy(() => import("@components/LyricsModal"));
const LyricsModalNew = lazy(() => import("@components/LyricsModalNew"));
import DownloadingOverlay from "@compUtils/DownloadingOverlay";
// import ShareModal from "@components/ShareModal";

const defaultLyricsData = {
  lang: "",
  lyrics: [],
  selectionCompleted: false,
  status: 0,
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
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const cardRef = useRef(null);

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
    if (objectEmpty(song)) return;

    setLyricsData(defaultLyricsData);
    setColors(null);

    // lyrics
    routes
      .getLyrics(id)
      .then((res) => {
        const lang = getLang(res.data);
        setLyricsData({
          lang: lang,
          lyrics: formatLyrics(res.data)
            .split("\n")
            .map((l) => [l, 0]),
          selectionCompleted: false,
          status: 1,
        });
      })
      .catch(() => {
        setLyricsData({
          ...defaultLyricsData,
          status: -1,
        });
      });

    //colors
    routes
      .getColors(image)
      .then((res) => {
        let { background_color, text_color } = res.data;

        if (getContrast(background_color, text_color, true) <= 2)
          text_color = bestContrast(background_color, ["#000000", "#ffffff"]);

        setColors({
          background_color: background_color,
          text_color: text_color,
        });
      })
      .catch(() => {
        console.error("Couldn't extract colors from image");
      });
  }, [song]);

  const handleResultSelected = (newSong) => setSong(newSong);

  const handleLyricsSelectionChanged = (index) => {
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

  const downloadHandler = () => {
    if (cardRef.current == null) return;

    setDownloading(true);
    const scale = 2;
    DomToImage.toBlob(cardRef.current, {
      width: cardRef.current.offsetWidth * scale,
      height: cardRef.current.offsetHeight * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      },
    }).then((blob) => {
      const img = new File([blob], `lyrics-card-${song.id}.png`);
      // routes.upload(img).then((res) => {
      //   setDownloading(false);
      // });
      downloadBlob(blob, `lyrics-card-${song.id ? song.id : "empty"}.png`);
      setDownloading(false);
    });

    // setShareModalOpen(false);
  };

  return (
    <QueryClientProvider client={new QueryClient()}>
      <div
        className={`${
          downloading && "downloading"
        } relative container max-w-[1920px] max-h-[1080px] mx-auto flex h-[100vh]`}
      >
        <Suspense>
          {useWindowSize().width <= 1150 && (
            <LyricsModalNew
              song={song}
              colors={colors}
              lyricsData={lyricsData}
              onLyricsSelectionChanged={handleLyricsSelectionChanged}
            />
          )}
        </Suspense>

        <aside className="hidden 2xl:grid grid-rows-[5rem_1fr] p-5 gap-7 h-full bg-[#272838]">
          <PageLogo className="h-[70%] self-center" />
          <SizeMenu
            className="flex items-center flex-col gap-4"
            cardClassName="aspect-square rounded-lg w-[85px] px-2"
            onSizeChanged={setCardAspectRatio}
          />

          <small className="text-small text-center text-white">
            <a
              className="inline-block mb-1 opacity-30 hover:opacity-100 transition-opacity"
              href="https://github.com/adhamali450"
              target="_black"
              rel="noopener"
            >
              @adhamali450
            </a>
            <br />
            <a
              className=" opacity-30 hover:opacity-100 transition-opacity"
              href="https://github.com/Omaryassenn"
              target="_black"
              rel="noopener"
            >
              @OmarYassen
            </a>
          </small>
        </aside>

        <main className="grow grid grid-rows-[5rem_1fr] grid-cols-[1fr] lg:grid-cols-[1fr_36ch] p-5 gap-5">
          <header className="relative lg:col-span-2 flex gap-4 sm:gap-8 items-center">
            <PageLogo
              className="block 2xl:hidden h-[60%] sm:h-[70%] self-center"
              geniusColor="#272838"
            />
            <Searchbar
              className="grow"
              onResultSelected={(id) => handleResultSelected(id)}
            />
          </header>

          <section className="row-start-2">
            <CardStyleContext.Provider value={{ cardStyling, setCardStyling }}>
              <OptionsPanel className="rounded-md mb-4 shadow-md" />
              <SizeMenu
                className="2xl:hidden flex items-center justify-center sm:justify-start gap-4 mb-4 px-2"
                cardClassName="aspect-square w-[65px] md:w-[80px]"
                showLabel={false}
                onSizeChanged={setCardAspectRatio}
              />

              <div className="relative">
                <LyricsCard
                  ref={cardRef}
                  cardInfo={song}
                  lyricsData={lyricsData}
                  aspectRatio={cardAspectRatio}
                  onDownload={downloadHandler}
                />
                <DownloadingOverlay
                  className="opacity-75 bg-gray-300 card-size show-when-download"
                  ratio={cardAspectRatio}
                  style={{ aspectRatio: cardAspectRatio.replace(":", "/") }}
                />
              </div>
            </CardStyleContext.Provider>

            {/* <ShareModal
            open={shareModalOpen}
            onClosing={() => setShareModalOpen(false)}
            downloadHandler={downloadHandler}
          /> */}
          </section>

          <aside className="row-start-2 col-start-2 hidden lg:grid grid-rows-[120px_1fr] border border-gray-400 rounded-md overflow-auto">
            {!objectEmpty(song) && (
              <Suspense>
                <SongPreview
                  className="row-start-1"
                  song={song}
                  colors={colors}
                />
              </Suspense>
            )}

            <LyricsViewer
              className="grow"
              style={{
                gridRow: !objectEmpty(song) ? "2/3" : "1/3",
              }}
              id={id}
              colors={colors}
              lyricsData={lyricsData}
              onSelectionChanged={handleLyricsSelectionChanged}
            />
          </aside>
        </main>
        <Suspense>
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="light"
          />
        </Suspense>
      </div>
    </QueryClientProvider>
  );
}

export default App;
