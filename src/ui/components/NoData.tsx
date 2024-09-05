import React from 'react';
import '@/assets/styles/components/_noData.scss';
import Layout from '@/ui/components/Layout';

const NoData: React.FC = () => {
  return (
    <Layout>
      <div className="no-data">No se encontraron datos.</div>
    </Layout>
  );
};

export default NoData;
