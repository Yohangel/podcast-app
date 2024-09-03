import { PodcastRepository } from "@/domain/repositories/PodcastRepository";
import { Podcast } from "@/domain/entities/Podcast";

export class GetPopularPodcasts {
  constructor(private podcastRepository: PodcastRepository) {}

  fetchPopularPodcasts = async (): Promise<Podcast[]> => {
    return await this.podcastRepository.getPopularPodcasts();
  };
}
