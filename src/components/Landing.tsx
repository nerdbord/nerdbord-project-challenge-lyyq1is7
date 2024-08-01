import React from "react";
import Pug from "../assets/pug.png";
import Image from "next/image";

type Props = {};

export const Landing = (props: Props) => {
  return (
    <div className="bg-[aqua]">
      <Image src={Pug} alt="Pug" width={500} height={500} />
      <h1>Financial Freedom at Your Fingertips</h1>
      <p>
        Podtytuł z krótkim, zachęcającym opisem do czego służy aplikacja, aby
        użytkownik chciał się zarejestrować i korzystać z niej.
      </p>
      <div>
        <button className="btn">Scan your first document</button>
        <p>
          Already have an account? <span>Login</span>
        </p>
      </div>
    </div>
  );
};
