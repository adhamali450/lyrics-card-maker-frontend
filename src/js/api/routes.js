import axios from "axios";

export const getCORSImage = async (url) => {
  const res = await axios.get("/api/cors?url=" + url);

  return res;
};

export const getLyrics = async (id) => {
  const res = axios.get(`/api/song/lyrics/${id}`);

  return res;
};

export const getColors = async (url) => {
  const res = axios.get(
    "https://genius-unofficial-api.vercel.app/api/song/colors",
    {
      params: { url: url },
    }
  );

  return res;
};

export default {
  getCORSImage,
  getLyrics,
  getColors,
};
