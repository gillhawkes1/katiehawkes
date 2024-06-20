import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get('https://itunes.apple.com/lookup?id=1539979442&media=podcast&entity=podcastEpisode&limit=200');

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from Spotify API:', error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}