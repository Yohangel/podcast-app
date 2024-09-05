import React from 'react';
import { Podcast } from '@/domain/entities/Podcast';
import '@/assets/styles/components/_podcastDetail.scss';
import { Link } from 'react-router-dom';

interface PodcastDetailProps {
  podcast: Podcast;
}

const PodcastDetail: React.FC<PodcastDetailProps> = ({ podcast }) => {
  return (
    <>
      {podcast.episodes && podcast.episodes.length > 0 && (
        <div className="podcast-detail">
          <h4>Episodes: {podcast.episodes.length}</h4>
          <div className="podcast-detail__table">
            <div className="podcast-detail__header">
              <span className="podcast-detail__column podcast-detail__title">
                Title
              </span>
              <span className="podcast-detail__column podcast-detail__date">
                Date
              </span>
              <span className="podcast-detail__column podcast-detail__duration">
                Duration
              </span>
            </div>
            {podcast.episodes.map((episode, index) => (
              <div
                key={episode.id}
                className={`podcast-detail__row ${index % 2 === 0 ? 'podcast-detail__row--even' : 'podcast-detail__row--odd'}`}
              >
                <span className="podcast-detail__column podcast-detail__title">
                  <Link to={`/podcast/${podcast.id}/episode/${episode.id}`}>
                    {episode.title}
                  </Link>
                </span>
                <span className="podcast-detail__column podcast-detail__date">
                  -
                </span>
                <span className="podcast-detail__column podcast-detail__duration">
                  {episode.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PodcastDetail;
