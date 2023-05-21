import React, { Fragment, useState, useEffect } from "react";

import Button from "@controls/Button";

import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookMessengerShareButton,
} from "react-share";
import ModalSheet from "react-modal-sheet";

import iconShare from "@assets/icon-share.svg";
import icons from "@assets/share";

const ShareModal = ({ open = false, onClosing = () => {} }) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const platforms = [
    {
      name: "Facebook",
      icon: icons.facebook,
      component: FacebookShareButton,
      aux: {},
    },
    {
      name: "Twitter",
      icon: icons.twitter,
      component: TwitterShareButton,
      aux: {},
    },
    {
      name: "WhatsApp",
      icon: icons.whatsapp,
      component: WhatsappShareButton,
      aux: {},
    },
    {
      name: "Messenger",
      icon: icons.messenger,
      component: FacebookMessengerShareButton,
      aux: {},
    },
  ];

  const closeHandler = () => {
    setIsOpen(false);
    onClosing();
  };
  return (
    <Fragment>
      <ModalSheet
        className="w-full xs:w-[80%]"
        isOpen={isOpen}
        snapPoints={[0.4]}
        style={{
          margin: "auto",
        }}
      >
        <ModalSheet.Container>
          <ModalSheet.Header
            pinned
            className="xs:rounded-t-md"
            onDirectionLock={closeHandler}
          ></ModalSheet.Header>
          <ModalSheet.Content>
            <div className="flex flex-col items-center justify-center w-full h-full">
              <h1 className="text-xl">Download and share </h1>
              <div className="mt-5 flex justify-center items-center">
                {/* Download */}
                <button className="flex flex-col items-center gap-2 hover:bg-gray-200 rounded-md p-2">
                  <img src={icons.download} />
                  <span className="text-sm">Download</span>
                </button>

                <hr className="inline-block bg-gray-300 w-[1px] h-[40px] mx-4" />

                {/* Share to social media */}
                <div className="grid gap-2 grid-cols-4">
                  {platforms.map((platform, index) => {
                    return (
                      <platform.component key={platform.name}>
                        <button className="w-full h-full flex flex-col items-center gap-2 hover:bg-gray-200 rounded-md p-2">
                          <img src={platform.icon} />
                          <span className="text-sm">{platform.name}</span>
                        </button>
                      </platform.component>
                    );
                  })}
                </div>
              </div>
            </div>
          </ModalSheet.Content>
        </ModalSheet.Container>
        <ModalSheet.Backdrop
          className="focus:outline-none focus-within:outline-none cursor-auto"
          onClick={closeHandler}
        />
      </ModalSheet>
    </Fragment>
  );
};

export default ShareModal;
