import { PodcastRepository } from "@/domain/repositories/PodcastRepository";
import { Podcast, Episode } from "@/domain/entities/Podcast";
import { fetchPopularPodcasts, fetchPodcastDetails } from "@/infrastructure/api/PodcastApi";

export class PodcastRepositoryImpl implements PodcastRepository {
  async getPopularPodcasts(): Promise<Podcast[]> {
    const data = await fetchPopularPodcasts();
    return data.feed.entry.map((item: any) => new Podcast(
      item.id.attributes['im:id'],
      item.title.label,
      item['im:artist'].label,
      item.summary.label,
      item['im:image'][2].label
    ));
  }

  async getPodcastDetails(podcastId: string): Promise<Podcast | null> {
    const data = await fetchPodcastDetails(podcastId);
    if (!data.results || data.results.length === 0) return null;

    const podcastData = data.results[0];
    const episodesData = data.results.slice(1); 

    const episodes = episodesData.map((ep: any) => new Episode(
      ep.trackId.toString(),
      ep.trackName,
      ep.description || ep.shortDescription || '',
      ep.episodeUrl || ep.episodeFileUrl,
      ep.trackTimeMillis ? `${Math.floor(ep.trackTimeMillis / 60000)}:${Math.floor((ep.trackTimeMillis % 60000) / 1000)}` : '0:00'
    ));

    return new Podcast(
      podcastData.trackId.toString(),
      podcastData.collectionName,
      podcastData.artistName,
      podcastData.description || podcastData.longDescription || '',
      podcastData.artworkUrl600,
      episodes
    );
  }
}
