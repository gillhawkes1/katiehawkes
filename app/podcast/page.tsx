"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PodcastEpisode from '@/components/podcast/PodcastEpisode';

const DEFAULT_LIMIT = 20;

interface Episode {
  id: number;
  title: string;
  urls: {
    spotify: string,
    buzzsprout: string
  };
  description: string;
  duration: number;
  artwork_url: string
}

export default function Podcast () {
  const [buzzsproutEpisodes, setBuzzsproutEpisodes] = useState([]);
  const [episodeData, setEpisodes] = useState<any>([]);
  const [next, setNext] = useState({ apple: null, spotify: null, amazon: null });
  const [loading, setLoading] = useState(false);
  const sortedEpisodes = 

  useEffect(() => {
    fetchInitialEpisodes();
  }, []);

  const fetchInitialEpisodes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/episodes`);
      const { episodes, next } = response.data;
      setBuzzsproutEpisodes(episodes.buzzsprout);
      setEpisodes([...episodes.spotify, ...episodes.buzzsprout]);
      setNext(next);
    } catch (error) {
      console.error('error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreEpisodes = async () => {
    //TODO: write this call to /api/episodes
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-16">
      <div className="podcast-container text-center">
        <h1 className="text-3xl font-bold mb-4">Contagious Confidence</h1>
        <h2 className="text-xl mb-6">The world needs the most confident version of you!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* {episodeData.map((episode) => (
            <PodcastEpisode
              key={episode.id}
              title={episode.title}
              urls={episode.urls}
              description={episode.description}
              duration={episode.duration}
              artwork_url={episode.artwork_url}
            />
          ))} */}
        </div>
        {next && (
          <button
            onClick={fetchMoreEpisodes}
            disabled={loading}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {loading ? 'Loading...' : 'Load More Episodes ->'}
          </button>
        )}
      </div>
    </main>
  );
}