import React, { useEffect, useState } from 'react';
import Layout from '@/ui/components/Layout';
import PodcastList from '@/ui/components/PodcastList';
import Loading from '@/ui/components/Loading';
import Error from '@/ui/components/Error';
import NoData from '@/ui/components/NoData';
import { PodcastRepositoryImpl } from '@/infrastructure/persistence/PodcastRepositoryImpl';
import { GetPopularPodcasts } from '@/application/use-cases/GetPopularPodcasts';
import { useQuery } from '@tanstack/react-query';
import { useLoading } from '@/shared/context/LoadingContext';
import { Podcast } from '@/domain/entities/Podcast';
import '@/assets/styles/pages/_podcastPage.scss';

const PodcastPage: React.FC = () => {
  const podcastRepository = new PodcastRepositoryImpl();
  const getPopularPodcasts = new GetPopularPodcasts(podcastRepository);
  const { startLoading, stopLoading } = useLoading();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);
  const [animateCount, setAnimateCount] = useState(false);

  const {
    data: podcasts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['popularPodcasts'],
    queryFn: getPopularPodcasts.fetchPopularPodcasts,
  });

  useEffect(() => {
    if (isLoading) {
      startLoading();
    } else {
      stopLoading();
    }
  }, [isLoading, startLoading, stopLoading]);

  useEffect(() => {
    if (podcasts) {
      const results = podcasts.filter(
        (podcast) =>
          podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          podcast.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPodcasts(results);
    }
  }, [searchTerm, podcasts]);

  useEffect(() => {
    setAnimateCount(true);
    const timer = setTimeout(() => setAnimateCount(false), 500); // Duration of the animation

    return () => clearTimeout(timer);
  }, [filteredPodcasts.length]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  if (!podcasts) {
    return <NoData />;
  }

  return (
    <Layout>
      <div className="podcast-filter">
        <div
          className={`podcast-filter__count ${animateCount ? 'animate' : ''}`}
        >
          {filteredPodcasts.length}
        </div>
        <input
          type="text"
          placeholder="Search for podcasts..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <PodcastList podcasts={filteredPodcasts} />
    </Layout>
  );
};

export default PodcastPage;
