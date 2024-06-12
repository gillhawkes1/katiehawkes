import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const DEFAULT_LIMIT = 20;

const fetchBuzzsproutEpisodes = async () => {
  const response = await axios.get('https://www.buzzsprout.com/api/1450141/episodes.json', {
      headers: {
        'Authorization': `Token token=${process.env.BUZZSPROUT_API_TOKEN}`
      }
    });
    return response.data;
}

const fetchAmazonEpisodes = async () => {

}

const fetchAppleEpisodes = async () => {
  
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
    const tokenResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify-token`);
    const { access_token } = tokenResponse.data;

    const spotifyUrl = req.query.nextSpotify ? req.query.nextSpotify as string : 'https://api.spotify.com/v1/shows/0GGkDmJt4deYfpf5aLafDw/episodes';
    //TODO: add these in the get functions at top, promise.all, and return data
    //const appleUrl = req.query.nextApple ? req.query.nextApple as string : '';
    //const amazonUrl = req.query.nextAmazon ? req.query.nextAmazon as string : '';

    const [buzzSproutEpisodes, spotifyData] = await Promise.all([
      fetchBuzzsproutEpisodes(),
      fetchSpotifyEpisodes(access_token, spotifyUrl),
    ]);

    //TODO: update this to sort episodes so they are one combined array of objects to display links to different servies per episode
    const episodes = {
      buzzsprout: buzzSproutEpisodes,
      spotify: spotifyData.episodes
    }

    res.status(200).json({
      episodes,
      next: {
        spotify: spotifyData.next
      }
    });
  } catch (error) {
    console.error('Error fetching data from APIs: ', error);
    res.status(500).json({ error: 'Failed to fetch data from APIs' });
  }
}
