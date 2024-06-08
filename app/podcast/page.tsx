"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Podcast () {
  const [podcastData, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`https://www.buzzsprout.com/api/1450141/episodes.json`, {
          headers: {
            'Authorization': `Token token=${process.env.NEXT_PUBLIC_BUZZSPROUT_API_TOKEN}`
          }
        });
        setData(response.data);
      } catch (error) {
        console.error('error fetching buzzsprout data: ', error);
      }
    };
    fetch();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
      <div className="podcast-container text-center">
        <h1 className="text-3xl font-bold">Contagious Confidence</h1>
        <h2 className="text-1xl">The world needs the most confident version of you!</h2>
        {podcastData.length ? <pre>{podcastData.map((episode) => (
          <h1 className='p-4'>{episode.title}</h1>
        ))}</pre> : "Loading ..."}
      </div>
    </main>
  );
}