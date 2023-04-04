import axios from "axios";
import React, { Fragment, useEffect, useState, useRef } from "react";
import SearchResult from "./SearchResult";
import LoadingAnimation from "@utils/LoadingAnimation";
import _ from "lodash";
import Popup from "@utils/Popup";

import styles from "./Searchbar.module.sass";

const Searchbar = ({ className, onResultSelected }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [currentlyTyping, setCurrentlyTyping] = useState(false);

  const [result, setResult] = useState([]);
  const [selectedSong, setSelectedSong] = useState({});

  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setResult([]);
    }, 1500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    search(debouncedQuery);
  }, [debouncedQuery]);

  const handleInputChange = (e) => {
    setCurrentlyTyping(true);
    setSelectedSong({});
    setQuery(e.target.value);
  };

  const search = (query) => {
    if (!query || query == "") return;

    setCurrentlyTyping(false);
    axios
      .get(`https://genius-unofficial-api.vercel.app/api/search`, {
        params: {
          query: query,
        },
      })
      .then((res) => {
        setResult(res.data);
      });
  };

  const handleResultSelected = (song) => {
    setSelectedSong(song);

    onResultSelected(song);
  };

  return (
    <form
      className={`${className} relative z-10`}
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
          className="block w-full p-4 pl-10 text-gray-900 border-2 border--200 rounded-lg bg-gray-50 focus:ring-[#c0c0c0] focus:border-[#c0c0c0] outline-none shadow-md"
          placeholder="Search for any song"
          aria-label="Search"
          value={query}
          onChange={(e) => handleInputChange(e)}
          ref={inputRef}
        />
      </div>

      {/* Results container */}
      {query && query != "" && _.isEqual(selectedSong, {}) && (
        <Popup className="relative" triggerRef={inputRef} triggerType="keyup">
          <div
            className="absolute mt-3 ml-3 border-2 min-w-[350px] w-[25%] flex flex-col gap-1 bg-white"
            style={{
              height: "max-content",
              alignItems: "stretch",
            }}
          >
            {/* Loading animation */}
            {(currentlyTyping || !result.length) && <LoadingAnimation />}

            {/* Results */}
            {!currentlyTyping && (
              <Fragment>
                {_.isEqual(result, []) ? (
                  <div>No results</div>
                ) : (
                  result.map((item, idx) => {
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

                {/* {result.length == 0 &&
                  } */}
              </Fragment>
            )}
          </div>
        </Popup>
      )}
    </form>
  );
};

export default Searchbar;
