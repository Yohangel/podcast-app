import React from 'react';
import { Episode } from '@/domain/entities/Podcast';
import '@/assets/styles/components/_episodeDetail.scss';

interface EpisodeDetailProps {
  episode: Episode;
}

const EpisodeDetail: React.FC<EpisodeDetailProps> = ({ episode }) => {
  return (
    <div className="episode-detail">
      <h5>{episode.title}</h5>
      <p dangerouslySetInnerHTML={{ __html: episode.description }} />
      <audio controls src={episode.audioUrl}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default EpisodeDetail;
