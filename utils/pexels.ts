const PEXELS_API_KEY = '8sLoMXg5fX4DKdmX8sSFxebcYNbdcwU6VizqTp4YRdrJ7a3MVlwc9qpp';

export const fetchPexelsVideos = async (query: string, perPage: number = 1) => {
  const response = await fetch(
    `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`,
    {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    }
  );
  return response.json();
};

export const fetchPexelsPhotos = async (query: string, perPage: number = 1) => {
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`,
    {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    }
  );
  return response.json();
};
