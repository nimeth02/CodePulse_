import React from "react";
import GraphSection from "../GraphSection/GraphSection";
import ChatSection from "../ChatSection/ChatSection";
import TeamConfigurations from "../Configurations/TeamConfigurations";
import "./Layout.scss";
import ErrorBoundary from "../Common/ErrorBoundaries/ErrorBoundary";

const Layout: React.FC = () => {
  console.log("layout");
 
  return (
    <div className="layout">
      <ErrorBoundary>
        <GraphSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <ChatSection />
      </ErrorBoundary>
      <TeamConfigurations />
    </div>
  );
};

export default Layout;
