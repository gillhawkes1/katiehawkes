import { BuzzsproutEpisode } from "@/app/interfaces/Podcast";

export const formatBuzzsproutData = (data: BuzzsproutEpisode[]) => {
  const res: object[] = data.map((episode: BuzzsproutEpisode) => {
    const formatted: object = {
      ...episode,
      episode_url: episode.audio_url.replace('.mp3', '')
    };
    return formatted;
  });

  return res;
}