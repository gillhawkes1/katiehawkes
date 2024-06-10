import React from 'react';
import styles from './PodcastEpisode.module.css';

interface PodcastEpisodeProps {
  title: string;
  audio_url: string,
  artwork_url: string,
  duration: number,
  description: string;
}

const PodcastEpisode: React.FC<PodcastEpisodeProps> = ({ title, description, audio_url, duration, artwork_url, }) => {
  return (
    <div className={styles.episodeContainer}>
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="mb-2">{description}</p>
      <p className="mb-2">{duration}</p>
      <p className="mb-2">{artwork_url}</p>
      {audio_url && (
        <a href={audio_url} target="_blank" rel="noopener noreferrer">
          <img src="/path/to/spotify-icon.png" alt="Listen on Spotify" className="h-8 w-8 inline-block" />
        </a>
      )}
    </div>
  );
};

export default PodcastEpisode;
