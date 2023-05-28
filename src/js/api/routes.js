import axios from "axios";

// TODO: Remove when fixing the vite.config.js proxy issue
const API_URL = "https://genius-unofficial-api.vercel.app/api";

export const getCORSImage = async (url) => {
  const res = await axios.get(API_URL + "/cors?url=" + encodeURIComponent(url));

  return res;
};

export const upload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  const res = await axios.post(API_URL + "/upload", formData);
  return res;
};

export const getLyrics = async (id) => {
  const res = await axios.get(API_URL + `/song/lyrics/${id}`);

  return res;
};

export const getColors = async (url) => {
  const res = await axios.get(API_URL + "/song/colors", {
    params: { url: url },
  });

  return res;
};

export const search = async (query) => {
  const res = await axios.get(API_URL + `/search`, {
    params: {
      query: query,
    },
  });

  return res;
};

export default {
  getCORSImage,
  getLyrics,
  upload,
  getColors,
  search,
};
