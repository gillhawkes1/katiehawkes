import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get('https://www.buzzsprout.com/api/1450141/episodes.json', {
      headers: {
        'Authorization': `Token token=${process.env.BUZZSPROUT_API_TOKEN}`
      }
    });
    console.log('this file was ran for buzzsprout get');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from Buzzsprout API:', error);
    res.status(500).json({ error: 'Uh oh! The Buzzsprout API is down :(' });
  }
}
