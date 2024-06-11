import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    //get buzzsprout data
    const buzzsproutResponse = await axios.get('https://www.buzzsprout.com/api/1450141/episodes.json', {
      headers: {
        'Authorization': `Token token=${process.env.BUZZSPROUT_API_TOKEN}`
      }
    });

    //get spotify token then fetch episodes
    const tokenRes = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify-token`);
    const { access_token } = tokenRes.data;
    const spotifyResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify`, {
      params: { accessToken: access_token}
    });

    // axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify`),
    // axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/amazon`),
    // axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/apple`)

    res.status(200).json({
      buzzsprout: buzzsproutResponse.data,
      spotify: spotifyResponse.data,
    });
  } catch (error) {
    console.error('Error fetching data from APIs: ', error);
    res.status(500).json({ error: 'Failed to fetch data from APIs' });
  }
}
