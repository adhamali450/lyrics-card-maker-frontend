import React, { Fragment, useState, useEffect, useRef } from "react";
import Sheet from "react-modal-sheet";
import {
  shareToFacebook,
  shareToTwitter,
  shareToWhatsApp,
  shareToMessenger,
} from "@utils/shareUtils";

import ModalSheet from "react-modal-sheet";

import iconShare from "@assets/icon-share.svg";
import icons from "@assets/share";
import { shadeColor } from "../utils";
import { shareToInstagram } from "../utils/shareUtils";

const ShareModal = ({
  open = false,
  onClosing = () => {},
  getShareUrl,
  downloadHandler,
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const [shareUrl, setShareUrl] = useState("");

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

  const handleShare = async (platform) => {
    shareToMessenger(
      "https://dl.dropboxusercontent.com/s/5c98fdgt13inhu9/lyrics-card-1499166.png"
    );
  };

  const closeHandler = () => {
    setIsOpen(false);
    onClosing();
  };

  return (
    <Sheet isOpen={isOpen} onClose={closeHandler} snapPoints={["0.5"]}>
      <Sheet.Container>
        <ModalSheet.Header
          pinned
          className="xs:rounded-t-md"
          onDirectionLock={closeHandler}
        ></ModalSheet.Header>
        <Sheet.Content>
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

              {/* Share to social media */}

              <div className="gap-2 grid grid-cols-2 md:grid-cols-4">
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
              </div>
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop onClick={closeHandler} />
    </Sheet>
  );
};

export default ShareModal;
