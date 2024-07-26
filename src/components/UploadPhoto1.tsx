"use client";
import React, { useState } from "react";
//import { supabase } from "../lib/supabaseClient";
//import { useUser } from "@supabase/auth-helpers-react";

type Props = {};

const UploadPhoto = (props: Props) => {
  //const user = useUser();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadPhoto;
