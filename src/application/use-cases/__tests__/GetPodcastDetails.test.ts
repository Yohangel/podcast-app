import { GetPodcastDetails } from '../GetPodcastDetails';
import { PodcastRepository } from '@/domain/repositories/PodcastRepository';
import { Podcast } from '@/domain/entities/Podcast';

const mockPodcastRepository = (): PodcastRepository => ({
  getPopularPodcasts: jest.fn(),
  getPodcastDetails: jest.fn().mockResolvedValue(
    new Podcast('1', 'Test Podcast', 'Test Author', 'Test Description', 'test-url')
  ),
});

describe('GetPodcastDetails Use Case', () => {
  test('should return podcast details', async () => {
    const podcastRepository = mockPodcastRepository();
    const getPodcastDetails = new GetPodcastDetails(podcastRepository);

    const podcast = await getPodcastDetails.fetchPodcastDetails('1');
    expect(podcast?.id).toBe('1');
    expect(podcast?.title).toBe('Test Podcast');
  });

  test('should return null if podcast not found', async () => {
    const podcastRepository = mockPodcastRepository();
    podcastRepository.getPodcastDetails = jest.fn().mockResolvedValue(null);
    const getPodcastDetails = new GetPodcastDetails(podcastRepository);

    const podcast = await getPodcastDetails.fetchPodcastDetails('999');
    expect(podcast).toBeNull();
  });
});
