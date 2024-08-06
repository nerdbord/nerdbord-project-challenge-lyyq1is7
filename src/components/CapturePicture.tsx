"use client";
import React, { useState, useRef, useEffect, ChangeEventHandler } from "react";
import { RiImageLine, RiSearchLine, RiFlashlightLine } from "react-icons/ri";
import { LensIcon } from "./icons/LensIcon";
import { GoBackBtn } from "./GoBackBtn";
import { analyzeReceipt, saveReceipt } from "../actions/receipt";
import { ReceiptDetails } from "./ReceiptDetails";
import { Loader } from "./Loader";
import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs"; // Import Clerk hooks
import { checkUserInDatabase } from "@/actions/user";

interface Props {}

interface Expense {
  items: never[];
  store: string;
  date: string;
  total: number;
  currency: string;
  category: string;
}

interface Result {
  expense: Expense;
  image?: string;
  error?: { message: string };
}

export const CapturePicture: React.FC<Props> = (props: Props) => {
  const { isLoaded, isSignedIn } = useUser(); // Clerk's user authentication state
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const router = useRouter();
  const { redirectToSignIn } = useClerk();

  useEffect(() => {
    if (videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
          setCameraError(null);
        })
        .catch((err) => {
          console.error("Failed to access camera:", err);
          setCameraError("No camera available or permission denied.");
        });
    }
  }, []);

  const handleCancel = () => {
    setImage(null);
    setResult(null);
    setAnalyzing(false);
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream?.getTracks() || [];
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
        setResult({ expense: analysis.expense, image, error: analysis.error });
      }
    } catch (error) {
      console.error("Photo unable to be analyzed.", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSaveReceipt = async () => {
    if (!isLoaded || !isSignedIn) {
      redirectToSignIn(); // Redirect to sign-in page
      return;
    }

    setLoading(true);
    try {
      // Call the server function to check or create the user in the database
      const currentUser = await checkUserInDatabase();
      if (!currentUser) {
        throw new Error("Failed to get user data. Please try again.");
      }

      if (result && result.expense) {
        const { expense } = result;
        const receiptData = {
          date: expense.date,
          store: expense.store,
          items: JSON.stringify(expense.items || []),
          total: expense.total,
          currency: expense.currency,
          category: expense.category,
          image: image || "",
          userId: currentUser.id, // Assuming the response contains the user's ID
        };
        const receiptId = await saveReceipt(receiptData);
        console.log("Receipt saved with ID:", receiptId);
      }
    } catch (error) {
      console.error("Failed to save receipt:", error);
    } finally {
      setLoading(false);
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-purple-50">
      {/* Header */}
      <div className="bg-white h-16 w-full"></div>
      <div className="flex gap-32 justify-between items-center bg-white h-12 w-full">
        <div className="flex items-center">
          <GoBackBtn />
          <p className="text-xl font-medium px-4">Capture Document</p>
        </div>
        <div className="flex items-center">
          <RiFlashlightLine />
        </div>
      </div>

      {/* Camera Section */}
      <div className="flex-grow flex items-center justify-center w-full relative">
        {loading ? (
          <Loader />
        ) : result ? (
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
        ) : cameraError ? (
          <div className="p-4 max-w-full max-h-full">
            <p>{cameraError}</p>
          </div>
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
          </>
        )}
        {/*         {image && !result && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <button
              onClick={captureImage}
              className="rounded-full h-20 w-20 flex justify-center items-center bg-violet-700 text-white"
            >
              <LensIcon />
            </button>
          </div>
        )} */}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-4 justify-center items-center bg-white w-full px-4 pb-6">
        {image && !result && (
          <div className="flex items-center w-full justify-evenly pt-2 pt-5 pb-10">
            <button
              onClick={handleCancel}
              className="rounded-full flex items-center justify-center w-32 px-8 py-4 border border-purple-900 text-purple-900"
            >
              <p className="px-2">Cancel</p>
            </button>

            <button
              onClick={handleAnalyzeReceipt}
              className="rounded-full w-32 px-8 py-4 border border-purple-900 bg-purple-900 text-white flex items-center justify-center"
            >
              <p className="px-2">Analyze</p>
            </button>
          </div>
        )}
        {result && (
          <div className="flex items-center w-full justify-evenly pt-2 pt-2 pt-5 pb-10">
            <button
              onClick={handleCancel}
              className="rounded-full w-32 px-8 py-4 border border-purple-900 text-purple-900 flex items-center justify-center"
            >
              <p className="px-2">Cancel</p>
            </button>
            {
              <button
                onClick={handleSaveReceipt}
                className="rounded-full w-32 px-8 py-4 border border-purple-900 bg-purple-900 text-white flex items-center justify-center"
              >
                <p className="px-2">Save</p>
              </button>
            }
          </div>
        )}
        {!image && !result && (
          <>
            <div className="flex gap-12 items-center w-full justify-evenly pt-2 pb-6 h-20">
              <label className="rounded-full h-12 w-12 flex justify-center items-center border border-violet-700 cursor-pointer m-0">
                <RiImageLine className="h-6 w-auto text-violet-700" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <button
                onClick={captureImage}
                className="rounded-full h-20 w-20 flex justify-center items-center bg-violet-700 text-white"
              >
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
