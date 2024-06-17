"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PodcastEpisode from '@/components/podcast/PodcastEpisode';

interface Episode {
  buzzsprout: BuzzsproutEpisode;
  spotify: SpotifyEpisode;
  // title: string;
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

const DEFAULT_LIMIT = 20;


export default function Podcast () {
  const [buzzsproutEpisodes, setBuzzsproutEpisodes] = useState<BuzzsproutEpisode[]>([]);
  const [spotifyEpisodes, setSpotifyEpisodes] = useState<SpotifyEpisode[]>([]);
  //const [episodeData, setEpisodes] = useState<Episode[]>([]);
  const [next, setNext] = useState({ apple: null, spotify: null, amazon: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInitialEpisodes();
  }, []);

  const fetchInitialEpisodes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/episodes`);
      const { buzzsprout, spotify, next } = response.data;
      setBuzzsproutEpisodes(buzzsprout);
      setSpotifyEpisodes(spotify);
      //setEpisodes(episodes);
      setNext(next);
    } catch (error) {
      console.error('error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };


  // const response = await axios.get<EpisodesResponse>('/api/episodes', {
  //   params: {
  //     nextSpotify: nextUrls.spotify,
  //     nextApple: nextUrls.apple,
  //     nextAmazon: nextUrls.amazon
  //   }
  // });
  // const { spotify, apple, amazon, next } = response.data;

  // setEpisodes(prevEpisodes => [
  //   ...prevEpisodes,
  //   ...spotify,
  //   ...apple,
  //   ...amazon
  // ]);
  // setNext(next);

  //TODO: sort and return episodes for each
  const sortedEpisodes = buzzsproutEpisodes.map(buzzEpisode => {
    let index: number = 0;
    const spotifyEpisode = spotifyEpisodes.find(ep => (ep.name.trim()) === buzzEpisode.title.trim());
    return {
      id: index++,
      buzzsprout: buzzEpisode,
      spotify: spotifyEpisode
    }
  });

  const fetchMoreEpisodes = async () => {
    //TODO: write this call to /api/episodes
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-16">
      <div className="podcast-container text-center">
        <h1 className="text-3xl font-bold mb-4">Contagious Confidence</h1>
        <h2 className="text-xl mb-6">The world needs the most confident version of you!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEpisodes.map((ep, index) => (
            ep.spotify &&
            <PodcastEpisode
              key={index}
              buzzsprout={ep.buzzsprout}
              spotify={ep.spotify}
            />
          ))}
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