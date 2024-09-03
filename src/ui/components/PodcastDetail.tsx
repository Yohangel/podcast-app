import React from "react";
import { Podcast } from "@/domain/entities/Podcast";

interface PodcastDetailProps {
  podcast: Podcast;
}

const PodcastDetail: React.FC<PodcastDetailProps> = ({ podcast }) => {
  return (
    <div>
      <img src={podcast.imageUrl} alt={podcast.title} />
      <h2>{podcast.title}</h2>
      <h3>{podcast.author}</h3>
      <p>{podcast.description}</p>

      {podcast.episodes && podcast.episodes.length > 0 && (
        <div>
          <h4>Episodios</h4>
          <ul>
            {podcast.episodes.map((episode) => (
              <li key={episode.id}>
                <h5>{episode.title}</h5>
                <p>{episode.description}</p>
                <audio controls src={episode.audioUrl}>
                  Your browser does not support the audio element.
                </audio>
                <span>Duración: {episode.duration}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PodcastDetail;
