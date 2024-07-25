"use client";
import React, { useState } from "react";
import OpenAI from "openai";

type Props = {};

const ReadTextFromPhoto = (props: Props) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const extractTextFromImage = async (file: File) => {};

  const handleUpload = () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    setLoading(true);
    extractTextFromImage(selectedFile);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading and Extracting..." : "Upload and Extract Text"}
      </button>
      {text && (
        <div>
          <h2>Extracted Text:</h2>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default ReadTextFromPhoto;
