import React from 'react';
import GraphSection from '../GraphSection/GraphSection';
import ChatSection from '../ChatSection/ChatSection';
import './Layout.scss';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <GraphSection />
      <ChatSection />
    </div>
  );
};

export default Layout;
