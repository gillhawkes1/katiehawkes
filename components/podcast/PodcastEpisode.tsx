import React from 'react';
import styles from './PodcastEpisode.module.css';
import { Episode } from '@/app/interfaces/Podcast';
import Image from 'next/image'

const PodcastEpisode: React.FC<Episode> = ({buzzsprout, spotify, apple, podbean}) => {
  const iconWidthHeight = 40;

  return (
    <main>
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg justify-center flex space-y-4 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
        <div className="flex flex-col items-center">
          <Image src="/assets/episode_logo.jpg" alt="Podcast Logo" className="rounded-lg" width={300} height={300} />
          <h3 className="text-lg font-semibold pt-2 text-center">{buzzsprout.title}</h3>
          <h5 className="text-m font-semibold text-center">S{buzzsprout.season_number} E{buzzsprout.episode_number}</h5>
          <div className="episode-links">
            {buzzsprout && (
              <a href={buzzsprout.episode_url} target="_blank" rel="noopener noreferrer">
                <Image src='/assets/buzzsprout.png' alt="Listen on Buzzsprout" className="h-10 w-10 inline-block p-1 m-1" width={iconWidthHeight} height={iconWidthHeight} />
              </a>
            )}
            {spotify && (
              <a href={spotify.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <Image src='/assets/spotify.svg' alt="Listen on Spotify" className="h-10 w-10 inline-block p-1 m-1" width={iconWidthHeight} height={iconWidthHeight} />
              </a>
            )}
            {apple && (
              <a href={apple.trackViewUrl} target="_blank" rel="noopener noreferrer">
                <Image src='/assets/applepodcasts.png' alt="Listen on Apple Podcasts" className="h-10 w-10 inline-block p-1 m-1" width={iconWidthHeight} height={iconWidthHeight} />
              </a>
            )}
            {podbean && (
              <a href={podbean.permalink_url} target="_blank" rel="noopener noreferrer">
                <Image src='/assets/podbean.png' alt="Listen on Podbean" className="h-10 w-10 inline-block p-1 m-1" width={iconWidthHeight} height={iconWidthHeight} />
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PodcastEpisode;
