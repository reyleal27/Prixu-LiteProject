export  interface Anime {
  id: string;
  title: { 
    userPreffered: string;
    english: string;
  };
  episode: EpisodeType[];
    image: string;
    totalEpisodes: number;
  description?: string;
  subOrDub?: "sub" | "dub";
  characters: CharactersProps[]
}

export interface CharactersProps {
  name: {
    full: string | null;
    native: string | null;
  };
  image: string;
}
export  interface AnimeListResponse {
  currentPage?: number;
  hasNextPage?: boolean;
  results: Anime[];
}

export interface EpisodeType{
  id?: string | null;
  episodeTitle?: string;
  number: number;
  url?: any;
}
