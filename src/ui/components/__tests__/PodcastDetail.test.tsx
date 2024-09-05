import React from 'react';
import { render, screen } from '@testing-library/react';
import PodcastDetail from '../PodcastDetail';
import { BrowserRouter as Router } from 'react-router-dom';
import { Podcast } from '@/domain/entities/Podcast';
import { Episode } from '@/domain/entities/Podcast';

const mockPodcast = new Podcast(
  '1',
  'Test Podcast',
  'Test Author',
  'Test Description',
  'test-url',
  [
    new Episode('1', 'Episode 1', 'Test Description', 'test-audio-url', '30min'),
    new Episode('2', 'Episode 2', 'Test Description', 'test-audio-url', '45min')
  ]
);

describe('PodcastDetail Component', () => {
  test('should render podcast details', () => {
    render(
      <Router>
        <PodcastDetail podcast={mockPodcast} />
      </Router>
    );

    expect(screen.getByText('Episodes: 2')).toBeInTheDocument();
    expect(screen.getByText('Episode 1')).toBeInTheDocument();
    expect(screen.getByText('Episode 2')).toBeInTheDocument();
  });
});
