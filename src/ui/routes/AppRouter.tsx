import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { useLoading } from '@/shared/context/LoadingContext';
import PodcastPage from '@/ui/containers/PodcastPage';
import PodcastDetailPage from '@/ui/containers/PodcastDetailPage';

const AppRouter: React.FC = () => {
  const location = useLocation();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
    return () => stopLoading();
  }, [location, startLoading, stopLoading]);

  return (
    <Routes>
      <Route path="/" element={<PodcastPage />} />
      <Route path="/podcast/:id" element={<PodcastDetailPage />} />
      <Route
        path="/podcast/:id/episode/:episodeId"
        element={<PodcastDetailPage />}
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
};

export default App;
