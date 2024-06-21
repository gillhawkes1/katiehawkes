import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { setCorsHeaders } from '@/utils/cors';
import { formatBuzzsproutData } from '@/utils/episodeUtil';

const DEFAULT_LIMIT = 20;

const fetchBuzzsproutEpisodes = async () => {
  const response = await axios.get('https://www.buzzsprout.com/api/1450141/episodes.json', {
      headers: {
        'Authorization': `Token token=${process.env.BUZZSPROUT_API_TOKEN}`
      }
    });
    const formattedData: object[] = formatBuzzsproutData(response.data);
    return formattedData;
}

const fetchAmazonEpisodes = async () => {

}

const fetchPodbeanEpisodes = async (token: string, url: string, offset: number, limit: number) => {
  const response = await axios.get(url, {
    params: {
      offset: offset,
      limit: limit,
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
}

const fetchAppleEpisodes = async () => {
  const response = await axios.get('https://itunes.apple.com/lookup?id=1539979442&media=podcast&entity=podcastEpisode&limit=200');
  return response.data.results;
}

const fetchSpotifyEpisodes = async (token: string, url: string) => {
  const response = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return {
    episodes: response.data.items,
    next: response.data.next
  };
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    setCorsHeaders(res, 'GET, POST, OPTIONS');
    if(req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    const spotifyTokenResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify-token`);
    const spotifyAccessToken = spotifyTokenResponse.data.access_token;

    const podbeanTokenResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/podbean-token`);
    const podbeanAccessToken = podbeanTokenResponse.data.access_token;

    const spotifyUrl = req.query.nextSpotify ? req.query.nextSpotify as string : 'https://api.spotify.com/v1/shows/0GGkDmJt4deYfpf5aLafDw/episodes';
    const podbeanUrl = req.query.nextPodbean ? req.query.nextPodbean as string : 'https://api.podbean.com/v1/episodes';
    //TODO: add these in the get functions at top, promise.all, and return data
    //const amazonUrl = req.query.nextAmazon ? req.query.nextAmazon as string : '';

    const [buzzSproutEpisodes, spotifyData, appleData, podbeanData] = await Promise.all([
      fetchBuzzsproutEpisodes(),
      fetchSpotifyEpisodes(spotifyAccessToken, spotifyUrl),
      fetchAppleEpisodes(),
      fetchPodbeanEpisodes(podbeanAccessToken, podbeanUrl, 0, 100),

    ]);

    //TODO: write the next logic for PODBEAN(limit 100), SPOTIFY(limit 20), APPLE (limit 200)
    res.status(200).json({
      buzzsprout: buzzSproutEpisodes,
      spotify: spotifyData.episodes,
      apple: appleData,
      podbean: podbeanData.episodes,
      // amazon: amazonData,
      next: {
        spotify: spotifyData.next,
        //podbean: spotifyData.next,
        // amazon: amazonData.next
      }
    });
  } catch (error) {
    console.error('Error fetching data from APIs: ', error);
    res.status(500).json({ error: 'Failed to fetch data from APIs' });
  }
}
