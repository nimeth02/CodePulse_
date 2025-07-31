import { GraphType } from "./GraphType";
import { TeamData } from "@services/ProjectTeams";

export type GraphSelectorProps = {
  activeTab: GraphType;
  setActiveTab: (activeTab: GraphType) => void;
};

export type TeamSelectorProps = {
  selectedTeam: TeamData;
  setSelectedTeam: (selectedTeam: TeamData) => void;
};

export type TimeSelectorProps = {
  selectedTime: number;
  setSelectedTime: (selectedTime: number) => void;
};
