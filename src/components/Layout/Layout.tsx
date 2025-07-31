import React from "react";
import GraphSection from "../GraphSection/GraphSection";
import ChatSection from "../ChatSection/ChatSection";
import TeamConfigurations from "../Configurations/TeamConfigurations";
import "./Layout.scss";
import ErrorBoundary from "../Common/ErrorBoundaries/ErrorBoundary";

const Layout: React.FC = () => {
  console.log("layout");
  const projectId = "C34D1F5A-6EB9-4539-A824-3F07F301E153";
  return (
    <div className="layout">
      <ErrorBoundary>
        <GraphSection projectId={projectId} />
      </ErrorBoundary>
      <ErrorBoundary>
        <ChatSection />
      </ErrorBoundary>
      <TeamConfigurations />
    </div>
  );
};

export default Layout;
