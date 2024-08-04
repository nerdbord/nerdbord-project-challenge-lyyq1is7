"use client";
import React, { useState, ChangeEventHandler } from "react";
import { RiImageLine, RiSearchLine, RiFlashlightLine } from "react-icons/ri";
import { LensIcon } from "./icons/LensIcon";
import { GoBackBtn } from "./GoBackBtn";
import { analyzeReceipt, saveReceipt } from "../actions/receipt";

type Props = {};

export const CapturePicture = (props: Props) => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  const handleCancel = () => {
    setImage(null);
    setResult(null);
  };

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeReceipt = async () => {
    try {
      if (image) {
        const analysis = await analyzeReceipt(image);
        setResult(analysis);
        console.log(analysis);
      }
    } catch (error) {
      console.error(
        "Photo unable to be analyzed - take another picture or add manually",
        error
      );
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-200 h-12 w-full p-4">
        <div className="flex items-center">
          <GoBackBtn />
          <p className="text-xl font-medium px-2">Capture Document</p>
        </div>
        <div className="flex items-center">
          <RiFlashlightLine />
        </div>
      </div>

      {/* Camera Section */}
      <div className="flex-grow bg-black text-white flex items-center justify-center w-full">
        {result ? (
          result.error ? (
            <p>{result.error.message}</p>
          ) : (
            <div className="bg-gray-100 text-black p-4 max-w-full max-h-full">
              <h2 className="text-xl font-bold">Analysis Result</h2>
              <p>
                <strong>Date:</strong> {result.expense?.date || "N/A"}
              </p>
              <p>
                <strong>Store:</strong> {result.expense?.store || "N/A"}
              </p>
              <p>
                <strong>Total:</strong> {result.expense?.total || "N/A"}
              </p>
              <p>
                <strong>Currency:</strong> {result.expense?.currency || "N/A"}
              </p>
              <p>
                <strong>Items:</strong> {result.expense?.items || "N/A"}
              </p>
              <p>
                <strong>Category:</strong> {result.expense?.category || "N/A"}
              </p>
            </div>
          )
        ) : image ? (
          <img
            src={image}
            alt="Receipt"
            className="max-h-full max-w-full p-4"
          />
        ) : (
          <div>Cam</div>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-4 justify-center items-center bg-gray-200 w-full px-4 h-28">
        {image && !result ? (
          <div className="flex items-center w-full justify-evenly pt-2">
            <button
              onClick={handleCancel}
              className="rounded-full px-8 py-4 border border-violet-900 text-violet-900"
            >
              <p className="px-2">Cancel</p>
            </button>
            <button
              onClick={handleAnalyzeReceipt}
              className="rounded-full px-5 py-4 border border-violet-900 bg-violet-900 text-white"
            >
              <p className="px-2">Analyze</p>
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-12 items-center w-full justify-evenly pt-2">
              <label className="rounded-full h-12 w-12 flex justify-center items-center border border-violet-700 cursor-pointer m-0">
                <RiImageLine className="h-6 w-auto text-violet-700" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <button className="rounded-full h-20 w-20 flex justify-center items-center bg-violet-700 ">
                <LensIcon />
              </button>
              <button className="rounded-full h-12 w-12 flex justify-center items-center border border-violet-700">
                <RiSearchLine className="h-6 w-auto text-violet-700" />
              </button>
            </div>
            <div className="flex gap-12 items-center pb-8 text-center text-xs font-medium w-full justify-evenly text-violet-700">
              <p>gallery</p>
              <p>scan document</p>
              <p>search</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
