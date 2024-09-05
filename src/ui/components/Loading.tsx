import React from 'react';
import '@/assets/styles/components/_loading.scss';
import Layout from '@/ui/components/Layout';

const Loading: React.FC = () => {
  return (
    <Layout>
      <div className="loading">Cargando...</div>
    </Layout>
  );
};

export default Loading;
