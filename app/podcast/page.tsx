"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PodcastEpisode from '@/components/podcast/PodcastEpisode';

interface Episode {
  id: number;
  title: string;
  audio_url: string;
  description: string;
  duration: number;
  artwork_url: string
}

export default function Podcast () {
  const [podcastData, setData] = useState<Episode[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('api/episodes');
        console.log(response)
        setData(response.data);
      } catch (error) {
        console.error('error fetching data: ', error);
      }
    };
    fetch();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
      <div className="podcast-container text-center">
        <h1 className="text-3xl font-bold">Contagious Confidence</h1>
        <h2 className="text-1xl">The world needs the most confident version of you!</h2>
        {podcastData.length ? 
        podcastData.map((episode) => (
          <PodcastEpisode
          key={episode.id}
          title={episode.title}
          audio_url={episode.audio_url}
          description={episode.description}
          duration={episode.duration}
          artwork_url={episode.artwork_url}
        />
        ))
        : "Loading ..."}
      </div>
    </main>
  );
}