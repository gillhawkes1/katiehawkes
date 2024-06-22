import { AppleEpisode, BuzzsproutEpisode, PodbeanEpisode } from "@/app/interfaces/Podcast";

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

export const formatAppleData = (data: AppleEpisode[]) => {
  let res: object[] = data;
  //the 0 index is just information about the podcast and not importation to finding episode info which is all we need
  res = res.slice(1);
  return res;
}

export const formatPodbeanData = (data: PodbeanEpisode[]) => {
  const res: object[] = data.map((episode: PodbeanEpisode) => {
    let formattedTitle: string = episode.title.includes('...') ? episode.title.split('...')[0] : episode.title;
    const formatted = {
      ...episode,
      title: formattedTitle
    };
    return formatted;
  })
  return res;
}