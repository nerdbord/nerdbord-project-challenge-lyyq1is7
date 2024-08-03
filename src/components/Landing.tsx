import React from "react";
import Pug from "../assets/pug.png";
import Image from "next/image";
import { SignInButton, ClerkProvider } from "@clerk/nextjs";
import { ScanButton } from "./ScanButton";

type Props = {};

export const Landing = (props: Props) => {
  return (
    <div className="flex flex-col gap-12 justify-center items-center">
      <Image className="pt-16" src={Pug} alt="Pug" width={500} height={500} />
      <div className="flex flex-col gap-8 text-center">
        <h1 className="text-3xl font-medium leading-10 text-gray-800">
          Financial Freedom <br /> at Your Fingertips
        </h1>
        <p className="text-gray-600">
          Podtytuł z krótkim, zachęcającym opisem do czego służy aplikacja, aby
          użytkownik chciał się zarejestrować i korzystać z niej.
        </p>
      </div>

      <div className="flex flex-col gap-5 items-center">
        <ScanButton />
        <p className="text-xs font-medium text-gray-500">
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
