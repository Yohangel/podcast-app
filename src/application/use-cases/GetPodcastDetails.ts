import { PodcastRepository } from "@/domain/repositories/PodcastRepository";
import { Podcast } from "@/domain/entities/Podcast";

export class GetPodcastDetails {
  constructor(private podcastRepository: PodcastRepository) {}

  fetchPodcastDetails = async (podcastId: string): Promise<Podcast | null> => {
    return await this.podcastRepository.getPodcastDetails(podcastId);
  };
}
