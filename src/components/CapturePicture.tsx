import React from "react";
import {
  RiImageLine,
  RiSearchLine,
  RiArrowLeftSLine,
  RiFlashlightLine,
} from "react-icons/ri";
import { LensIcon } from "./icons/LensIcon";

type Props = {};

export const CapturePicture = (props: Props) => {
  return (
    <div className="flex flex-col h-screen w-full">
      {/* Header */}
      <div className="flex justify-between items-center bg-grey-light h-12 w-full p-4">
        <RiArrowLeftSLine />
        <p className="text-xl font-medium">Capture Document</p>
        <RiFlashlightLine />
      </div>

      {/* Camera Section */}
      <div className="flex-grow bg-black text-white flex items-center justify-center w-full">
        <div>Cam</div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-4 pt-2 justify-center items-center  w-full">
        <div className="flex gap-12 items-center w-full justify-evenly">
          <button className="round-button h-12 w-12 flex justify-center items-center">
            <RiImageLine className="h-6 w-auto" />
          </button>
          <button className="round-button h-20 w-20 flex justify-center items-center">
            <LensIcon />
          </button>
          <button className="round-button h-12 w-12 flex justify-center items-center">
            <RiSearchLine className="h-6 w-auto" />
          </button>
        </div>
        <div className="flex gap-12 items-center pb-8 text-center text-xs font-medium w-full justify-evenly">
          <p className="text-grey">Gallery</p>
          <p className="text-black">Scan Document</p>
          <p className="text-grey">Search</p>
        </div>
      </div>
    </div>
  );
};
