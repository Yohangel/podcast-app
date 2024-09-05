import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '@/ui/components/Layout';
import PodcastDetail from '@/ui/components/PodcastDetail';
import Loading from '@/ui/components/Loading';
import Error from '@/ui/components/Error';
import NoData from '@/ui/components/NoData';
import { PodcastRepositoryImpl } from '@/infrastructure/persistence/PodcastRepositoryImpl';
import { GetPodcastDetails } from '@/application/use-cases/GetPodcastDetails';
import { useQuery } from '@tanstack/react-query';
import { useLoading } from '@/shared/context/LoadingContext';
import EpisodeDetail from '@/ui/components/EpisodeDetail';
import { Episode } from '@/domain/entities/Podcast';
import '@/assets/styles/pages/_podcastDetail.scss';
import PodcastInfo from '@/ui/components/EpisodeInfo';

const PodcastDetailPage: React.FC = () => {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const { id, episodeId } = useParams<{ id: string; episodeId?: string }>();
  const podcastRepository = new PodcastRepositoryImpl();
  const getPodcastDetails = new GetPodcastDetails(podcastRepository);
  const { startLoading, stopLoading } = useLoading();

  const {
    data: podcast,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['podcastDetails', id],
    queryFn: () =>
      id ? getPodcastDetails.fetchPodcastDetails(id) : Promise.resolve(null),
    enabled: !!id,
  });

  useEffect(() => {
    if (!episodeId) {
      setEpisode(null); // clean "episode", when user back in browser
    }
  }, [episodeId]);

  useEffect(() => {
    if (isLoading) {
      startLoading();
    } else {
      stopLoading();
    }
  }, [isLoading, startLoading, stopLoading]);

  useEffect(() => {
    if (podcast && episodeId) {
      const foundEpisode = podcast.episodes?.find((e) => e.id === episodeId);
      setEpisode(foundEpisode || null);
    }
  }, [podcast, episodeId]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  if (!podcast || (episodeId && !episode)) {
    return <NoData />;
  }

  return (
    <Layout>
      <div className="podcast-detail__container">
        {episode ? (
          <Link to={`/podcast/${id}`}>
            <PodcastInfo podcast={podcast} />
          </Link>
        ) : (
          <PodcastInfo podcast={podcast} />
        )}
        {episode ? (
          <EpisodeDetail episode={episode} />
        ) : (
          <PodcastDetail podcast={podcast} />
        )}
      </div>
    </Layout>
  );
};

export default PodcastDetailPage;
