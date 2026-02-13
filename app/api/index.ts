import consumetAxios from "./consumetAPI";
import {Anime} from "./type/type";
import { AnimeListResponse } from "./type/type";
import {EpisodeType} from "./type/type";

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

export const searchAnime = async (query: string): Promise<AnimeListResponse> => { 
  const res = await consumetAxios.get<AnimeListResponse>(
    `/${encodeURIComponent(query)}`,
  );
  return res.data;
}


export const getAnimeDetails = async (id: string): Promise<Anime> => { 
  const res = await consumetAxios.get<Anime>(`/info/${id}?provider=zoro`);
  return res.data;
}

export const getAnimeEpisodes = async (id: string): Promise<EpisodeType[]> => { 
  const res = await consumetAxios.get<any[]>(
    `/episodes/${id}?provider=zoro&dub=false&fetchFiller=false`,
  );
  return res.data;
}


export const getEpisodeStream = async (episodeId: string) => {
  // Replace $ with -
  const normalizedId = episodeId.replace(/\$/g, "-");
  const res = await consumetAxios.get(`/watch/${normalizedId}`);
  console.log(res)
  return res.data; // contains sources array
};

