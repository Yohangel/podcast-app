import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PodcastPage from "@/ui/containers/PodcastPage";
import PodcastDetailPage from "@/ui/containers/PodcastDetailPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PodcastPage />} />
        <Route path="/podcast/:id" element={<PodcastDetailPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
