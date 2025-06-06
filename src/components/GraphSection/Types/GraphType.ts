import { TeamData } from "../../../services/ProjectTeams";

export type GraphType = 'closed' | 'closedComparison' | 'cycleTime'|'prActivity'|'cycleTimeComparison';

export interface GraphProps {
        type: GraphType,
        projectId:string,
    selectedTeam: TeamData,
    selectedTime:number
  }