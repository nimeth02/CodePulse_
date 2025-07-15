import { TeamData } from "../../../services/ProjectTeams";

export type GraphType = 'closed' | 'closedComparison' | 'cycleTime'|'prActivity'|'cycleTimeComparison';

export interface GraphContainerProps {
        type: GraphType,
        projectId:string,
        selectedTeam: TeamData,
        selectedTime:number
  }

 export  interface GraphProps {
    selectedTeam: TeamData;
    projectId: string;
    year: number;
  }  