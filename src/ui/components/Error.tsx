import React from 'react';
import '@/assets/styles/components/_error.scss';
import Layout from '@/ui/components/Layout';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <Layout>
      <div className="error">{message}</div>
    </Layout>
  );
};

export default Error;
