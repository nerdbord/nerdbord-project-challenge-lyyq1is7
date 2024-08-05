"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { RiArrowLeftSLine } from "react-icons/ri";

type Props = {};

export const GoBackBtn = (props: Props) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <button onClick={handleGoBack} className="">
      <RiArrowLeftSLine />
    </button>
  );
};
