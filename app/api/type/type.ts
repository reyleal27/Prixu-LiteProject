export interface Anime {
  id: string;
  title: { 
    userPreffered: string;
    english: string;
  };
    image: string;
    totalEpisodes: number;
  description?: string;
  subOrDub?: "sub" | "dub";
}

export interface AnimeListResponse {
  currentPage?: number;
  hasNextPage?: boolean;
  results: Anime[];
}
