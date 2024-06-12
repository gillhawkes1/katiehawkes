import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tokenResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify-token`);
    const { access_token } = tokenResponse.data;

    const url = req.query.next ? req.query.next as string : 'https://api.spotify.com/v1/shows/0GGkDmJt4deYfpf5aLafDw/episodes';
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from Spotify API: ', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
