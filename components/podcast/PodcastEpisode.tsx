import React from 'react';
import styles from './PodcastEpisode.module.css';

interface Episode {
  buzzsprout: BuzzsproutEpisode;
  spotify: SpotifyEpisode;
  // urls: {
  //   spotify?: string,
  //   buzzsprout?: string
  // };
  // description: string;
  // duration: number;
  // date: Date;
  // season_number: number;
  // episode_number: number;
}

interface BuzzsproutEpisode {
  id: number;
  title: string;
  audio_url: string;
  description: string;
  duration: number;
  date: Date;
  season_number: number;
  episode_number: number;
}

interface SpotifyEpisode {
  id: number;
  name: string;
  external_urls: {
    spotify: string;
  }
}

interface NextUrls {
  spotify: string | null;
  apple: string | null;
  amazon: string | null;
}

interface EpisodesResponse {
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
const PodcastEpisode: React.FC<Episode> = ({episode}) => {
  return (
    <div className={styles.episodeContainer}>
      <h3 className="text-2xl font-semibold">{episode.buzzsprout.title}</h3>

      {episode.buzzsprout && (
        <a href={episode.buzzsprout.audio_url} target="_blank" rel="noopener noreferrer">
          <img src="buzzsprout.png" alt="Listen on Buzzsprout" className="h-8 w-8 inline-block" />
        </a>
      )}
      {episode.spotify && (
        <a href={episode.spotify.external_urls.spotify} target="_blank" rel="noopener noreferrer">
          <img src="spotify.jpg" alt="Listen on Spotify" className="h-8 w-8 inline-block m-3" />
        </a>
      )}
    </div>
  );
};

export default PodcastEpisode;
