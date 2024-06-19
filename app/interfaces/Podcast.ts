export interface Episode {
  buzzsprout: BuzzsproutEpisode;
  spotify: SpotifyEpisode;
}

export interface BuzzsproutEpisode {
  id: number;
  title: string;
  audio_url: string;
  description: string;
  duration: number;
  date: Date;
  season_number: number;
  episode_number: number;
  episode_url: string;
}

export interface SpotifyEpisode {
  id: number;
  name: string;
  external_urls: {
    spotify: string;
  }
}

export interface NextUrls {
  spotify: string | null;
  apple: string | null;
  amazon: string | null;
}

export interface EpisodesResponse {
  buzzsprout: Episode[];
  spotify: Episode[];
  apple: Episode[];
  amazon: Episode[];
  next: {
    spotify: string | null;
    apple: string | null;
    amazon: string | null;
  };
}