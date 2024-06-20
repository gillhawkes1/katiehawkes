import React from 'react';
import styles from './PodcastEpisode.module.css';
import { Episode } from '@/app/interfaces/Podcast';
import Image from 'next/image'

const PodcastEpisode: React.FC<Episode> = ({buzzsprout, spotify, apple}) => {
  return (
    <div className={styles.episodeContainer}>
      <h3 className="text-2xl font-semibold">{buzzsprout.title}</h3>
      <div className="m-2">
        {buzzsprout && (
          <a href={buzzsprout.episode_url} target="_blank" rel="noopener noreferrer">
            <Image src='/assets/buzzsprout.png' alt="Listen on Buzzsprout" className="h-8 w-8 inline-block m-1" width={50} height={50} />
          </a>
        )}
        {spotify && (
          <a href={spotify.external_urls.spotify} target="_blank" rel="noopener noreferrer">
            <Image src='/assets/spotify.jpg' alt="Listen on Spotify" className="h-8 w-8 inline-block m-1" width={50} height={50} />
          </a>
        )}
        {apple && (
          <a href={apple.trackViewUrl} target="_blank" rel="noopener noreferrer">
            <Image src='/assets/applepodcasts.png' alt="Listen on Apple Podcasts" className="h-8 w-8 inline-block m-1" width={50} height={50} />
          </a>
        )}
      </div>
    </div>
  );
};

export default PodcastEpisode;
