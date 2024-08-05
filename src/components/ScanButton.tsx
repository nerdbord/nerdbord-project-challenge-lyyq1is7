"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {};

export const ScanButton = (props: Props) => {
  const router = useRouter();

  const handleCapturePicture = () => {
    router.push("/scan");
  };

  return (
    <button
      onClick={handleCapturePicture}
      className="bg-blue-color text-black rounded-full px-5 py-6 text-base not-italic font-normal leading-6 grey-dark-color mt-5"
    >
      Scan your first document
    </button>
  );
};
