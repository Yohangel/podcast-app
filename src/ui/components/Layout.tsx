import React from 'react';
import Header from '@/ui/components/Header';
import '@/assets/styles/layout/_layout.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__content">{children}</main>
    </div>
  );
};

export default Layout;
