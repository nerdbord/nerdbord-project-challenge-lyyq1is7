// src/utils/analyzeImage.ts
export const analyzeImage = async (imageUrl: string) => {
  if (!imageUrl || !isValidUrl(imageUrl)) {
    throw new Error("Invalid URL");
  }

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
  return data;
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};
