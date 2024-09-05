import { Podcast } from '@/domain/entities/Podcast';
import '@/assets/styles/components/_podcastInfo.scss';

interface podcastInfoProps {
  podcast: Podcast;
}

const PodcastInfo: React.FC<podcastInfoProps> = ({ podcast }) => {
  return (
    <div className="podcast-info">
      <img src={podcast.imageUrl} alt={podcast.title} />
      <h2>{podcast.title}</h2>
      <h3>by {podcast.author}</h3>
      <p>{podcast.description}</p>
    </div>
  );
};

export default PodcastInfo;
