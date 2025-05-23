import React from 'react';
import Graph from '../GraphSection/GraphSection';
import Chat from '../ChatSection/ChatSection';
import './Layout.scss';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Graph />
      <Chat />
    </div>
  );
};

export default Layout;
