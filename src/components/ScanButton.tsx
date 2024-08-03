"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {};

export const ScanButton = (props: Props) => {
  const router = useRouter();

  const handleCapturePicture = () => {
    console.log("Capture picture");
    router.push("/scan");
  };

  return (
    <button onClick={handleCapturePicture} className="btn btn-neutral">
      Scan your first document
    </button>
  );
};
