import {
  fetchPopularPodcasts,
  fetchPodcastDetails,
} from '@/infrastructure/api/PodcastApi';
import { PodcastRepositoryImpl } from '@/infrastructure/persistence/PodcastRepositoryImpl';

// Mock the apiConfig module
jest.mock('@/infrastructure/config/apiConfig', () => ({
  ALL_ORIGINS_URL: 'https://mock-all-origins-url.com/',
  API_BASE_URL: 'https://mock-api-base-url.com/',
}));

jest.mock('@/infrastructure/api/PodcastApi');

const mockPopularPodcasts = [
  {
    id: { attributes: { 'im:id': '1' } },
    title: { label: 'Test Podcast' },
    'im:artist': { label: 'Test Author' },
    summary: { label: 'Test Description' },
    'im:image': [{}, {}, { label: 'test-url' }],
  },
];

const mockPodcastDetails = {
  results: [
    {
      trackId: '1',
      collectionName: 'Test Podcast',
      artistName: 'Test Author',
      description: 'Test Description',
      artworkUrl600: 'test-url',
    },
    {
      trackId: '2',
      trackName: 'Episode 1',
      episodeUrl: 'test-audio-url',
      trackTimeMillis: 300000, // 5 minutes
    },
  ],
};

describe('PodcastRepositoryImpl', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch popular podcasts from API', async () => {
    (fetchPopularPodcasts as jest.Mock).mockResolvedValue({
      feed: { entry: mockPopularPodcasts },
    });

    const podcastRepository = new PodcastRepositoryImpl();
    const podcasts = await podcastRepository.getPopularPodcasts();

    expect(podcasts.length).toBe(1);
    expect(podcasts[0].id).toBe('1');
    expect(fetchPopularPodcasts).toHaveBeenCalled();
  });

  test('should fetch podcast details from API', async () => {
    (fetchPodcastDetails as jest.Mock).mockResolvedValue(mockPodcastDetails);

    const podcastRepository = new PodcastRepositoryImpl();
    const podcast = await podcastRepository.getPodcastDetails('1');

    expect(podcast?.episodes?.length).toBe(1);
    expect(fetchPodcastDetails).toHaveBeenCalled();
  });
});
