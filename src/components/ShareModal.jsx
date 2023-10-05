import React, { useState, useEffect } from "react";
import {
  shareToFacebook,
  shareToTwitter,
  shareToWhatsApp,
  shareToMessenger,
} from "@utils/shareUtils";

import { Global } from "@emotion/react";
import { SwipeableDrawer } from "@mui/material";
import useOnBackButton from "@hooks/useOnBackButton";

import icons from "@assets/share";

const ShareModal = ({
  open = false,
  onClosing = () => {},
  getShareUrl,
  copyHandler,
  downloadHandler,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const platforms = [
    {
      name: "Facebook",
      icon: icons.facebook,
      handler: shareToFacebook,
      params: {},
    },
    {
      name: "Twitter",
      icon: icons.twitter,
      handler: shareToTwitter,
      params: {},
    },
    {
      name: "WhatsApp",
      icon: icons.whatsapp,
      handle: shareToWhatsApp,
      params: {},
    },
    {
      name: "Messenger",
      icon: icons.messenger,
      handler: shareToMessenger,
      params: {
        appId: "1750198052103051",
      },
    },
  ];

  const handleShare = async (platform) => {};

  // Close modal on back button
  useOnBackButton(() => {
    setIsOpen(false);
  });

  const closeHandler = () => {
    setIsOpen(false);
    onClosing();
  };

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  return (
    <>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50vh)`,
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={isOpen}
        onClose={closeHandler}
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
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-xl">Download and share</h1>
          <div className="mt-5 flex flex-col md:flex-row justify-center items-center">
            {/* Download */}
            <button
              className="flex flex-row md:flex-col items-center gap-2 hover:bg-gray-200 rounded-md p-2"
              onClick={downloadHandler}
            >
              <img src={icons.download} />
              <span className="text-sm">Download</span>
            </button>

            <hr className="hidden md:inline-block bg-gray-300 w-[1px] h-[40px] mx-4" />

            <button
              className="flex flex-row md:flex-col items-center gap-2 hover:bg-gray-200 rounded-md p-2"
              onClick={copyHandler}
            >
              <img src={icons.copyToClipboard} />
              <span className="text-sm">Copy</span>
            </button>

            <hr className="hidden md:inline-block bg-gray-300 w-[1px] h-[40px] mx-4" />

            {/* Share to social media */}

            <div className="relative gap-2 grid grid-cols-2 md:grid-cols-4 pointer-events-none">
              {platforms.map((platform, index) => {
                return (
                  <button
                    className="w-full h-full flex flex-row md:flex-col items-center gap-2 hover:bg-gray-200 rounded-md p-2"
                    key={platform.name}
                    onClick={() => handleShare(platform.name)}
                  >
                    <img src={platform.icon} />
                    <span className="text-sm">{platform.name}</span>
                  </button>
                );
              })}

              <div className="absolute inset-0 backdrop-blur-sm grid place-content-center">
                <span className="px-3 py-1 text-black text-opacity-70 font-bold rounded-md bg-[#f2d62f] shadow-md">
                  soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default ShareModal;
