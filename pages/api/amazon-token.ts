import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.post('https://api.amazon.com/auth/o2/token', null, {
      params: {
        grant_type: 'client_credentials',
        client_id: process.env.AMAZON_CLIENT_ID,
        client_secret: process.env.AMAZON_CLIENT_SECRET,
        scope: 'appstore::apps:readwrite'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    console.log(response.data)
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching token from Amazon Music API:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
