import React from "react";
import Logo from "../assets/logo.png";
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";
import { ScanButton } from "./ScanButton";
import "./styles.css";

type Props = {};

export const Landing = (props: Props) => {
  return (
    <div className="flex flex-col gap-12 justify-center items-center bg-purple-color h-screen p-4">
      <Image className="" src={Logo} alt="Pug" width={180} height={120} />
      <div className="flex flex-col gap-8 text-center">
        <h1 className="text-center text-4xl not-italic font-semibold leading-10 neutral-color">
          Financial Freedom <br /> at Your Fingertips
        </h1>
        <p className="text-center text-base not-italic font-normal leading-6 neutral-color px-2 ">
          Saving and controlling expenses is easy. Scan receipts, monitor your
          finances and enjoy financial freedom.
        </p>
      </div>

      <div className="flex flex-col gap-6 items-center ">
        <ScanButton />
        <p className="text-xs font-medium text-white">
          Already have an account?{" "}
          {SignInButton ? (
            <span className="text-blue-600 underline">
              <SignInButton>
                <button>Login</button>
              </SignInButton>
            </span>
          ) : (
            <span className="text-blue-600">Login</span>
          )}
        </p>
      </div>
    </div>
  );
};
