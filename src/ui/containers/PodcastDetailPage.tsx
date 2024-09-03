import React from 'react';
import { useParams } from 'react-router-dom';
import PodcastDetail from '@/ui/components/PodcastDetail';
import { PodcastRepositoryImpl } from '@/infrastructure/persistence/PodcastRepositoryImpl';
import { GetPodcastDetails } from '@/application/use-cases/GetPodcastDetails';
import { useQuery } from '@tanstack/react-query';
import { Podcast } from '@/domain/entities/Podcast';

const PodcastDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const podcastRepository = new PodcastRepositoryImpl();
  const getPodcastDetails = new GetPodcastDetails(podcastRepository);

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

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!podcast) return <div>No se encontró el podcast.</div>;

  return (
    <div>
      <PodcastDetail podcast={podcast} />
    </div>
  );
};

export default PodcastDetailPage;
