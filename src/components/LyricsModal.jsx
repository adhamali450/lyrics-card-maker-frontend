import React, { Fragment, useState, useEffect } from "react";
import { SwipeableDrawer } from "@mui/material";
import { Global } from "@emotion/react";
import SongPreview from "@components/SongPreview";
import LyricsViewer from "@components/LyricsViewer";

import useOnBackButton from "@hooks/useOnBackButton";

import { objectEmpty } from "@utils";

const LyricsModal = ({
  song = {},
  colors = {},
  lyricsData,
  onLyricsSelectionChanged,
}) => {
  const { id } = song;

  const [isOpen, setIsOpen] = useState(false);

  // Close modal on back button
  useOnBackButton(() => {
    setIsOpen(false);
  });

  useEffect(() => {
    if (!objectEmpty(song)) {
      setIsOpen(true);
    }
  }, [song]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  return (
    <Fragment>
      {!objectEmpty(song) && (
        <button
          className="block fixed w-full xs:w-[80%] h-[70px] -translate-x-1/2 left-1/2 bottom-0 z-50 overflow-hidden xs:rounded-t-md bg-white xs:border xs:border-b-0 xs:border-gray-400 "
          onClick={handleOpen}
        >
          <SongPreview className="h-full text-sm" song={song} colors={colors} />
        </button>
      )}
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(60vh - ${56}px)`,
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={isOpen}
        onClose={handleClose}
        onOpen={() => {}}
        sx={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `50vh`,
            overflow: "visible",
          },
        }}
        variant="temporary"
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        allowSwipeInChildren={true}
      >
        <SongPreview className="h-[120px]" song={song} colors={colors} />
        <LyricsViewer
          className="overflow-auto h-full"
          id={id}
          colors={colors}
          lyricsData={lyricsData}
          lineMax={80}
          onSelectionChanged={onLyricsSelectionChanged}
        />
      </SwipeableDrawer>
    </Fragment>
  );
};

export default LyricsModal;
