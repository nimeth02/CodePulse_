import { TeamData } from "../../../services/TeamConfigurationService";
import { GraphType } from "./GraphType";

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

export type  MonthSelectorProps= {
  selectedMonth: number;
  setSelectedMonth:(selectedMonth: number) => void;
}