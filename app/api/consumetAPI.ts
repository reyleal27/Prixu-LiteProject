import axios from "axios";

export const API_BASE_URL =
  "https://anime-server-api.vercel.app/meta/anilist";
const consumetAxios = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default consumetAxios;
