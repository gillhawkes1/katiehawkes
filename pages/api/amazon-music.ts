import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get('https://api.amazonmusic.com/v1/podcasts/shows/b4910557', {
      headers: {
        'Authorization': `Bearer ${process.env.AMAZON_MUSIC_API_TOKEN}`
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from Amazon Music API:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
