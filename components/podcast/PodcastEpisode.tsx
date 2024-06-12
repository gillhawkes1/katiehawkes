import React from 'react';
import styles from './PodcastEpisode.module.css';

interface PodcastEpisodeProps {
  episode: any
}

const PodcastEpisode: React.FC<PodcastEpisodeProps> = ({ episode }) => {
  return (
    <div className={styles.episodeContainer}>
      <h3 className="text-2xl font-semibold">{episode.buzzsprout.title}</h3>

      {/* {urls && (
        <a href={urls.spotify} target="_blank" rel="noopener noreferrer">
          <img src="/path/to/spotify-icon.png" alt="Listen on Spotify" className="h-8 w-8 inline-block" />
        </a>
      )} */}
    </div>
  );
};

export default PodcastEpisode;
