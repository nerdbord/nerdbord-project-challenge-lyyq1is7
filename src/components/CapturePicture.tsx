"use client";
import React, { useState, useRef, useEffect, ChangeEventHandler } from "react";
import { RiImageLine, RiSearchLine, RiFlashlightLine } from "react-icons/ri";
import { LensIcon } from "./icons/LensIcon";
import { GoBackBtn } from "./GoBackBtn";
import { analyzeReceipt, saveReceipt } from "../actions/receipt";
import { ReceiptDetails } from "./ScannedReceipt";

type Props = {};

export const CapturePicture = (props: Props) => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Request the user's camera
    if (videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current!.srcObject = stream;
          videoRef.current!.play();
        })
        .catch((err) => {
          console.error("Failed to access camera:", err);
        });
    }
  }, []);

  const handleCancel = () => {
    setImage(null);
    setResult(null);
    setAnalyzing(false);
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        setImage(canvasRef.current.toDataURL("image/png"));
      }
    }
  };

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setResult(null);
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
        setAnalyzing(true);
        const analysis = await analyzeReceipt(image);
        setResult(analysis);
      }
    } catch (error) {
      console.error("Photo unable to be analyzed.", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSaveReceipt = async () => {
    console.log("Saving receipt...");
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
      <div className="flex-grow flex items-center justify-center w-full relative">
        {result ? (
          result.error ? (
            <div className="p-4 max-w-full max-h-full">
              An error occurred while analyzing the receipt.
              <p>{result.error.message}</p>
            </div>
          ) : (
            <ReceiptDetails result={result} />
          )
        ) : analyzing ? (
          <div>Analyzing text...</div>
        ) : image ? (
          <img
            src={image}
            alt="Receipt"
            className="max-h-full max-w-full p-4"
          />
        ) : (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
            <canvas ref={canvasRef} className="hidden" />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <button
                onClick={captureImage}
                className="rounded-full h-16 w-16 flex justify-center items-center bg-violet-700 text-white"
              >
                <LensIcon />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-4 justify-center items-center bg-gray-200 w-full px-4 h-28">
        {image && !result && (
          <div className="flex items-center w-full justify-evenly pt-2">
            <button
              onClick={handleCancel}
              className="rounded-full flex items-center justify-center w-32 px-8 py-4 border border-violet-900 text-violet-900"
            >
              <p className="px-2">Cancel</p>
            </button>

            <button
              onClick={handleAnalyzeReceipt}
              className="rounded-full w-32 px-8 py-4 border border-violet-900 bg-violet-900 text-white flex items-center justify-center"
            >
              <p className="px-2">Analyze</p>
            </button>
          </div>
        )}
        {result && (
          <div className="flex items-center w-full justify-evenly pt-2">
            <button
              onClick={handleCancel}
              className="rounded-full w-32 px-8 py-4 border border-violet-900 text-violet-900 flex items-center justify-center"
            >
              <p className="px-2">Cancel</p>
            </button>

            <button
              onClick={handleSaveReceipt}
              className="rounded-full w-32 px-8 py-4 border border-violet-900 bg-violet-900 text-white flex items-center justify-center"
            >
              <p className="px-2">Save</p>
            </button>
          </div>
        )}
        {!image && !result && (
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
