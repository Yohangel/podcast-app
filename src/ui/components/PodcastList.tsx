import React from 'react';
import { Podcast } from '@/domain/entities/Podcast';
import { Link } from 'react-router-dom';
import '@/assets/styles/components/_podcastList.scss';

interface PodcastListProps {
  podcasts: Podcast[];
}

const PodcastList: React.FC<PodcastListProps> = ({ podcasts }) => {
  return (
    <ul className="podcast-list">
      {podcasts.map((podcast) => (
        <li key={podcast.id} className="podcast-list__item">
          <Link to={`/podcast/${podcast.id}`}>
            <div className="podcast-card">
              <img
                src={podcast.imageUrl}
                alt={podcast.title}
                className="podcast-card__image"
              />
              <h3 className="podcast-card__title">{podcast.title}</h3>
              <p className="podcast-card__author">Author: {podcast.author}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PodcastList;
