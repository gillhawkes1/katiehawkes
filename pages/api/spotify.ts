import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken } = req.query;

  if(!accessToken) {
    return res.status(400).json({ error: 'Missing spotify access token' });
  }

  try {
    const response = await axios.get('https://api.spotify.com/v1/shows/0GGkDmJt4deYfpf5aLafDw/episodes', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from Spotify API: ', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
