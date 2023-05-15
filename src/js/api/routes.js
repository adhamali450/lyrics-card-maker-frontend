import axios from "axios";

// TODO: Remove when fixing the vite.config.js proxy issue
// const API_URL = "https://genius-unofficial-api.vercel.app/api";

export const getCORSImage = async (url) => {
  const res = await axios.get("/api/cors?url=" + encodeURIComponent(url));

  return res;
};

export const getLyrics = async (id) => {
  const res = await axios.get(`/api/song/lyrics/${id}`);

  return res;
};

export const getColors = async (url) => {
  const res = await axios.get("/api/song/colors", {
    params: { url: url },
  });

  return res;
};

export const search = async (query) => {
  const res = await axios.get(`/api/search`, {
    params: {
      query: query,
    },
  });

  return res;
};

export default {
  getCORSImage,
  getLyrics,
  getColors,
  search,
};
