import React from 'react';
import { Podcast } from '@/domain/entities/Podcast';
import { Link } from 'react-router-dom';

interface PodcastListProps {
  podcasts: Podcast[];
}

const PodcastList: React.FC<PodcastListProps> = ({ podcasts }) => {
  return (
    <ul>
      {podcasts.map((podcast) => (
        <li key={podcast.id}>
          <img src={podcast.imageUrl} alt={podcast.title} />
          <h3>
            <Link to={`/podcast/${podcast.id}`}>{podcast.title}</Link>
          </h3>
          <p>{podcast.author}</p>
        </li>
      ))}
    </ul>
  );
};

export default PodcastList;
