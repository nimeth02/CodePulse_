export type GraphType = 'merged' | 'nonMerged' | 'cycleTime'|'prActivity';

export interface GraphProps {
    type: GraphType,
    selectedTeam: string
  }