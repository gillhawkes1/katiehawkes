import React from 'react';
import styles from './PodcastEpisode.module.css';
import { Episode } from '@/app/interfaces/Podcast';

const PodcastEpisode: React.FC<Episode> = ({buzzsprout, spotify}) => {
  return (
    <div className={styles.episodeContainer}>
      <h3 className="text-2xl font-semibold">{buzzsprout.title}</h3>

      {buzzsprout && (
        <a href={buzzsprout.episode_url} target="_blank" rel="noopener noreferrer">
          <img src="buzzsprout.png" alt="Listen on Buzzsprout" className="h-8 w-8 inline-block" />
        </a>
      )}
      {spotify && (
        <a href={spotify.external_urls.spotify} target="_blank" rel="noopener noreferrer">
          <img src="spotify.jpg" alt="Listen on Spotify" className="h-8 w-8 inline-block m-3" />
        </a>
      )}
    </div>
  );
};

export default PodcastEpisode;
