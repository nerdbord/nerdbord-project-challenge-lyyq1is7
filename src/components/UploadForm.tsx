"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { analyzeImage } from "@/utils/analyzeImage";

export const UploadForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{
    message: { content: string };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const data = await analyzeImage(imageUrl);
      setResponse(data);
      console.log(data.message);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Image Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter image URL here"
          value={imageUrl}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          Analyze
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {response && (
        <div>
          <h2>Response</h2>
          <p>{response.message}</p>
        </div>
      )}
    </div>
  );
};
