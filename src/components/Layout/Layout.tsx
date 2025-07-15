import React from "react";
import GraphSection from "../GraphSection/GraphSection";
import ChatSection from "../ChatSection/ChatSection";
import TeamConfigurations from "../Configurations/TeamConfigurations";
import "./Layout.scss";
import ErrorBoundary from "../Common/ErrorBoundaries/ErrorBoundary";

const Layout: React.FC = () => {
  console.log("layout");
  const projectId = "0F480576-9F9C-451D-9437-74806ED85B83";
  return (
    <div className="layout">
      <ErrorBoundary>
        <GraphSection projectId={projectId} />
      </ErrorBoundary>
      <ErrorBoundary>
        <ChatSection />
      </ErrorBoundary>
      <TeamConfigurations projectId={projectId} />
    </div>
  );
};

export default Layout;
