import axios from "axios";
import consumetAxios from "./consumetAPI";
import { AnimeListResponse } from "./type/type";

// 🔥 Top Anime
export const getTopAnime = async (): Promise<AnimeListResponse> => {
  const res = await consumetAxios.get<AnimeListResponse>(
    "/popular?page=1&perPage=10",
  );
  return res.data;
};


// 🆕 New /Trending Anime
 export const getTrendingAnime = async (): Promise<AnimeListResponse> => {
  const res = await consumetAxios.get<AnimeListResponse>(
    "/trending?page=1&perPage=10",
  );
  return res.data;
};


