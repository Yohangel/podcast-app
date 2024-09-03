import { Podcast } from "@/domain/entities/Podcast";

export interface PodcastRepository {
  getPopularPodcasts(): Promise<Podcast[]>;
  getPodcastDetails(podcastId: string): Promise<Podcast | null>;
}
