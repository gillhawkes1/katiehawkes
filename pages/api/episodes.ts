import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [buzzsproutResponse, spotifyResponse, amazonResponse, appleResponse] = await Promise.all([
      axios.get('https://www.buzzsprout.com/api/1450141/episodes.json', {
        headers: {
          'Authorization': `Token token=${process.env.BUZZSPROUT_API_TOKEN}`
        }
      }),
      axios.get(`${process.env.NEXT_PUBLIC_URL}/api/spotify`),
      axios.get(`${process.env.NEXT_PUBLIC_URL}/api/amazon`),
      axios.get(`${process.env.NEXT_PUBLIC_URL}/api/apple`)
    ]);

    res.status(200).json({
      buzzsprout: buzzsproutResponse.data,
      spotify: spotifyResponse.data,
      amazon: amazonResponse.data,
      apple: appleResponse.data
    });
  } catch (error) {
    console.error('Error fetching data from APIs:', error);
    res.status(500).json({ error: 'Failed to fetch data from APIs' });
  }
}
