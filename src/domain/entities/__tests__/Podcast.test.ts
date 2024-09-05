import { Podcast, Episode } from '../Podcast';

describe('Podcast Entity', () => {
  test('should create a Podcast entity correctly', () => {
    const podcast = new Podcast(
      '1',
      'Test Podcast',
      'Test Author',
      'Test Description',
      'test-image-url',
      [
        new Episode('1', 'Episode 1', 'Description 1', 'audioUrl1', '30min'),
        new Episode('2', 'Episode 2', 'Description 2', 'audioUrl2', '45min'),
      ]
    );

    expect(podcast.id).toBe('1');
    expect(podcast.title).toBe('Test Podcast');
    expect(podcast.author).toBe('Test Author');
    expect(podcast.episodes?.length).toBe(2);
  });

  test('should create an Episode entity correctly', () => {
    const episode = new Episode('1', 'Episode 1', 'Test Description', 'audioUrl', '30min');
    expect(episode.id).toBe('1');
    expect(episode.title).toBe('Episode 1');
    expect(episode.description).toBe('Test Description');
    expect(episode.duration).toBe('30min');
  });
});
