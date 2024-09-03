import axios from 'axios';
import { ALL_ORIGINS_URL, API_BASE_URL } from '@/infrastructure/config/apiConfig';

export const fetchPopularPodcasts = async (): Promise<any> => {
  const url = `${ALL_ORIGINS_URL}${encodeURIComponent(`${API_BASE_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`)}`;
  const response = await axios.get(url);

  if (response.status !== 200) {
    throw new Error('Failed to fetch podcasts');
  }
  console.log(response)
  return JSON.parse(response.data.contents);
};

export const fetchPodcastDetails = async (podcastId: string): Promise<any> => {
  const url = `${ALL_ORIGINS_URL}${encodeURIComponent(`${API_BASE_URL}/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`)}`;
  const response = await axios.get(url);

  if (response.status !== 200) {
    throw new Error('Failed to fetch podcast details');
  }

  return JSON.parse(response.data.contents);
};
