"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PodcastEpisode from '@/app/podcast/PodcastEpisode';
import { BuzzsproutEpisode, SpotifyEpisode, AppleEpisode, PodbeanEpisode, NextUrls } from '../../interfaces/Podcast';

export default function Podcast () {
  const [buzzsproutEpisodes, setBuzzsproutEpisodes] = useState<BuzzsproutEpisode[]>([]);
  const [spotifyEpisodes, setSpotifyEpisodes] = useState<SpotifyEpisode[]>([]);
  const [appleEpisodes, setAppleEpisodes] = useState<AppleEpisode[]>([]);
  const [podbeanEpisodes, setPodbeanEpisodes] = useState<PodbeanEpisode[]>([]);
  const [nextUrls, setNextUrls] = useState<NextUrls>({ nextSpotify: null, hasMore: true});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialEpisodes();
  }, []);

  const fetchInitialEpisodes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/episodes`);
      const { buzzsprout, spotify, apple, podbean, nextUrls } = response.data;
      setBuzzsproutEpisodes(buzzsprout);
      setSpotifyEpisodes(spotify);
      setAppleEpisodes(apple);
      setPodbeanEpisodes(podbean);
      setNextUrls(nextUrls);
    } catch (error) {
      console.error('error fetching podcast page data: ', error);
    } finally {
      setLoading(false);
    }
  };

  const sortedEpisodes = buzzsproutEpisodes.map(buzzEpisode => {
    let index: number = 0;
    const spotifyEpisode = spotifyEpisodes.find(ep => (ep.name.trim()) === buzzEpisode.title.trim());
    const appleEpisode = appleEpisodes.find(ep => (ep.trackName.trim()) === buzzEpisode.title.trim());
    const podbeanEpisode = podbeanEpisodes.find(ep => (buzzEpisode.season_number === ep.season_number) && (buzzEpisode.episode_number === ep.episode_number));
    return {
      id: index++,
      buzzsprout: buzzEpisode,
      spotify: spotifyEpisode,
      apple: appleEpisode,
      podbean: podbeanEpisode,
    }
  });

  const fetchMoreEpisodes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/episodes`,{
        params: {
          ...nextUrls
        }
      });

      const { spotify, newNextUrls } = response.data;

      setSpotifyEpisodes(prevEpisodes => [
        ...prevEpisodes,
        ...spotify
      ]);
      setNextUrls(newNextUrls);
    } catch (error) {
      console.log('there was an error loading more episodes', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-16">
      <div className="podcast-container text-center">
        <h1 className="text-3xl font-bold mb-4">Contagious Confidence</h1>
        <h2 className="text-xl mb-6">The world needs the most confident version of you!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEpisodes.map((ep, index) => (
            ep.buzzsprout && ep.spotify && ep.apple && ep.podbean &&
            <PodcastEpisode
              key={index}
              buzzsprout={ep.buzzsprout}
              spotify={ep.spotify}
              apple={ep.apple}
              podbean={ep.podbean}
            />
          ))}
        </div>

        {nextUrls.hasMore && (
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