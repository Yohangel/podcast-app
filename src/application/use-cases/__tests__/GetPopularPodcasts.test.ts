import { GetPopularPodcasts } from '../GetPopularPodcasts';
import { PodcastRepository } from '@/domain/repositories/PodcastRepository';
import { Podcast } from '@/domain/entities/Podcast';

const mockPodcastRepository = (): PodcastRepository => ({
  getPopularPodcasts: jest.fn().mockResolvedValue([
    new Podcast('1', 'Test Podcast', 'Test Author', 'Test Description', 'test-url'),
  ]),
  getPodcastDetails: jest.fn(),
});

describe('GetPopularPodcasts Use Case', () => {
  test('should return popular podcasts', async () => {
    const podcastRepository = mockPodcastRepository();
    const getPopularPodcasts = new GetPopularPodcasts(podcastRepository);

    const podcasts = await getPopularPodcasts.fetchPopularPodcasts();
    expect(podcasts.length).toBe(1);
    expect(podcastRepository.getPopularPodcasts).toHaveBeenCalled();
  });
});
