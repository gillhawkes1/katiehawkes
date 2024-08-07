import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { setCorsHeaders } from '@/utils/cors';
import { formatBuzzsproutData, formatAppleData, formatPodbeanData } from '@/utils/episodeUtil';
import { NextUrls } from '../../interfaces/Podcast';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const fetchBuzzsproutEpisodes = async () => {
    const response = await axios.get('https://www.buzzsprout.com/api/1450141/episodes.json', {
        headers: {
          'Authorization': `Token token=${process.env.BUZZSPROUT_API_TOKEN}`
        }
      });
      return formatBuzzsproutData(response.data);
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
    const results = {
      ...response.data,
      episodes: formatPodbeanData(response.data.episodes)
    }
    return results;
  }
  
  const fetchAppleEpisodes = async () => {
    const response = await axios.get('https://itunes.apple.com/lookup?id=1539979442&media=podcast&entity=podcastEpisode&limit=200');
    const formattedData: object[] = formatAppleData(response.data.results);
    return formattedData;
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

  // BUSINESS LOGIC
  try {
    setCorsHeaders(res, 'GET, POST, OPTIONS');
    if(req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    //TODO: create a promise.all for the tokens
    const spotifyTokenResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify-token`);
    const spotifyAccessToken = spotifyTokenResponse.data.access_token;

    const podbeanTokenResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/podbean-token`);
    const podbeanAccessToken = podbeanTokenResponse.data.access_token;

    //TODO: simplify somehow
    const spotifyUrl = req.query.nextSpotify ? req.query.nextSpotify as string : 'https://api.spotify.com/v1/shows/0GGkDmJt4deYfpf5aLafDw/episodes';
    const podbeanUrl = req.query.nextPodbean ? req.query.nextPodbean as string : 'https://api.podbean.com/v1/episodes';

    //for inital fetching; there are no params. could be refactored in the future if we need to do more than two types of fetching here 
    if(!Object.keys(req.query).length) {
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
        nextUrls: {
          nextSpotify: spotifyData.next,
          hasMore: spotifyData.next !== null ? true : false
        }
      });
    } else { //fetch using next links
      const [spotifyData] = await Promise.all([
        fetchSpotifyEpisodes(spotifyAccessToken, spotifyUrl)
      ]);
      const newNextUrls: NextUrls = {
        nextSpotify: spotifyData.next,
        hasMore: spotifyData.next !== null ? true : false
      }
      res.status(200).json({
        spotify: spotifyData.episodes,
        newNextUrls: {
          ...newNextUrls
        }
      });
    }
  } catch (error) {
    console.error('Error fetching data from APIs: ', error);
    res.status(500).json({ error: 'Failed to fetch data from APIs' });
  }
}
