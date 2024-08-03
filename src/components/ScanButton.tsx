"use client";
import React from "react";
import { redirect } from "next/navigation";

type Props = {};

export const ScanButton = (props: Props) => {
  const handleCapturePicture = () => {
    redirect("/scan");
  };
  return (
    <button onClick={handleCapturePicture} className="btn btn-neutral">
      Scan your first document
    </button>
  );
};
