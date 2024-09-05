import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/assets/styles/main.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoadingProvider } from '@/shared/context/LoadingContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
