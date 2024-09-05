import React from 'react';
import { render, screen } from '@testing-library/react';
import PodcastList from '../PodcastList';
import { BrowserRouter as Router } from 'react-router-dom';
import { Podcast } from '@/domain/entities/Podcast';

const mockPodcasts: Podcast[] = [
  new Podcast('1', 'Test Podcast 1', 'Author 1', 'Description 1', 'test-url-1'),
  new Podcast('2', 'Test Podcast 2', 'Author 2', 'Description 2', 'test-url-2')
];

describe('PodcastList Component', () => {
  test('should render a list of podcasts', () => {
    render(
      <Router>
        <PodcastList podcasts={mockPodcasts} />
      </Router>
    );

    expect(screen.getByText('Test Podcast 1')).toBeInTheDocument();
    expect(screen.getByText('Test Podcast 2')).toBeInTheDocument();
  });
});
