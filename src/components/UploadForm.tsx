"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

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

    if (!imageUrl || !isValidUrl(imageUrl)) {
      setError("Invalid URL");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/vision", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image_url: imageUrl }),
      });

      if (res.status !== 200) {
        throw new Error("Failed to analyze image: " + res.statusText);
      }

      const data = await res.json();
      setResponse(data);
      console.log(data.message);
    } catch (error) {
      console.error(error);
      setError("Failed to analyze image ");
    } finally {
      setLoading(false);
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
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
