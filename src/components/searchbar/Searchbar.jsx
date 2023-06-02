import { Fragment, useState, useRef } from "react";
import routes from "@/js/api/routes";

import SearchResult from "./SearchResult";
import LoadingAnimation from "@compUtils/LoadingAnimation";
import Popup from "@compUtils/Popup";

import { objectEmpty } from "@utils";

import { useDebounce } from "use-debounce";
import { useQuery } from "react-query";

import iconNoResults from "@assets/icon-no-results.svg";

const search = async (q) => {
  if (!q) return;

  console.time("search");
  const res = await routes.search(q);
  console.timeEnd("search");

  return res.data;
};

const Searchbar = ({ className, onResultSelected }) => {
  const [currentlyTyping, setCurrentlyTyping] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 1500);

  const { data, isLoading, isError, error, isFetching } = useQuery(
    ["search", debouncedQuery],
    () => {
      setCurrentlyTyping(false);
      return search(debouncedQuery[0]);
    },
    {
      enabled: !!debouncedQuery,
      keepPreviousData: true,
    }
  );
  const [selectedSong, setSelectedSong] = useState({});

  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    if (!currentlyTyping) setCurrentlyTyping(true);
    setSelectedSong({});
    setQuery(e.target.value);
  };

  const handleResultSelected = (song) => {
    setSelectedSong(song);
    onResultSelected(song);
  };

  return (
    <form
      className={`${className} sm:relative z-10`}
      onSubmit={(e) => e.preventDefault()}
    >
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          className="block w-full p-3 pl-10 sm:p-4 sm:pl-10 text-gray-900 border-2 border-gray-200 rounded-lg bg-white focus:ring-[#c0c0c0] focus:border-[#dadada] outline-none shadow-sm"
          placeholder="Search for any song"
          aria-label="Search"
          value={query}
          onChange={(e) => handleInputChange(e)}
          ref={inputRef}
        />
      </div>

      {/* Results container */}
      {query && objectEmpty(selectedSong) && (
        <Popup
          className="-translate-x-1/2 left-1/2 sm:translate-x-0 sm:left-0 mt-3 sm:ml-3 min-w-[90%] sm:min-w-[350px]"
          triggerRef={inputRef}
          triggerType="keyup"
        >
          <div
            className="border-2 flex flex-col gap-1 bg-white"
            style={{
              minHeight: "100px",
              height: "max-content",
              alignItems: "stretch",
            }}
          >
            {/* Loading animation */}
            {(isLoading || isFetching || currentlyTyping) && (
              <LoadingAnimation
                className="absolute w-full h-full inset-0 bg-white opacity-70"
                size={30}
              />
            )}

            {/* Error */}
            {isError && <div>Error: {error.message}</div>}

            {/* Search Results */}
            {data && (
              <Fragment>
                {data && !data.length ? (
                  <div
                    className="flex items-center justify-center gap-2"
                    style={{
                      minHeight: "100px",
                    }}
                  >
                    <img
                      width={28}
                      height={28}
                      className="w-7 h-7"
                      src={iconNoResults}
                    />
                    No results
                  </div>
                ) : (
                  data?.map((item, idx) => {
                    return (
                      <SearchResult
                        key={idx}
                        className="bg-gray-50 hover:bg-gray-300 active:bg-gray-400"
                        img={item.image}
                        songName={item.title}
                        artistName={item.artist}
                        onClick={() => handleResultSelected(item)}
                      />
                    );
                  })
                )}
              </Fragment>
            )}
          </div>
        </Popup>
      )}
    </form>
  );
};

export default Searchbar;
