import React from 'react';
import PodcastList from '@/ui/components/PodcastList';
import { PodcastRepositoryImpl } from '@/infrastructure/persistence/PodcastRepositoryImpl';
import { GetPopularPodcasts } from '@/application/use-cases/GetPopularPodcasts';
import { useQuery } from '@tanstack/react-query';
import { Podcast } from '@/domain/entities/Podcast';

const PodcastPage: React.FC = () => {
  const podcastRepository = new PodcastRepositoryImpl();
  const getPopularPodcasts = new GetPopularPodcasts(podcastRepository);

  const {
    data: podcasts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['popularPodcasts'],
    queryFn: getPopularPodcasts.fetchPopularPodcasts,
  });

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!podcasts) return <div>No se encontraron podcasts.</div>;

  return (
    <div>
      <h1>Podcasts Populares</h1>
      <PodcastList podcasts={podcasts} />
    </div>
  );
};

export default PodcastPage;
