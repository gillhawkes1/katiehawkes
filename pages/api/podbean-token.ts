import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('made it')
        const response = await axios.post('https://api.podbean.com/v1/oauth/token', `grant_type=client_credentials`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${process.env.PODBEAN_CLIENT_ID}:${process.env.PODBEAN_CLIENT_SECRET}`).toString('base64')
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching podbean token: ', error);
    res.status(500).json({ error: 'Failed to fetch podbean access token' });
  }
}