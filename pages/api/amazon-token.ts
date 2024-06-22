import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get('https://api.music.amazon.dev/v1/podcasts/shows/b4910557', {
      headers: {
        'x-api-key': `${process.env.AMAZON_SECURITY_PROFILE_ID}`
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from Amazon Music API:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
