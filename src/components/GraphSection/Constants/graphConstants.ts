import { GraphType } from "../Types/GraphType";
import { TeamData } from "../../../services/ProjectTeams";
export const tabs: { id: GraphType; label: string }[] = [
    { id: 'closed', label: 'Closed' },
    { id: 'closedComparison', label: 'Closed Comparison' },
    { id: 'cycleTime', label: 'Cycle Time' },
    { id: 'cycleTimeComparison', label: 'Cycle Time Comparison' },
    { id: 'prActivity', label: 'PR Activity' }
  ];
export const timeOptions=[2025,2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011]

  export const GRAPH_TITLES: Record<GraphType, string> = {
    closed: 'Closed Pull Requests',
    closedComparison: 'Closed Comparison of Pull Requests',
    cycleTime: 'Cycle Time Analysis',
    cycleTimeComparison: 'Cycle Time Comparison',
    prActivity: 'PR Activity',
  };
  
  export const getGraphTitle = (type: GraphType,selectedTeamName:string): string => {
    if (type === 'cycleTimeComparison' || type === 'closedComparison') {
      return "Project "  + GRAPH_TITLES[type] || 'Graph Area';
    }
    return selectedTeamName + ' ' + GRAPH_TITLES[type] || 'Graph Area';
  };
