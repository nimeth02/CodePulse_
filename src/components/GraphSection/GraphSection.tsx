import './GraphSection.scss';
import GraphContainer from './GraphContainer';
import {getGraphTitle, timeOptions } from './Constants/graphConstants'
import { useGraphSection} from './hooks/useGraphSection'
import TeamSelector from './Selectors/TeamSelector';
import GraphSelector from './Selectors/GraphSelector';
import { useMemo } from 'react';
import TimeSelector from './Selectors/TimeSelector';
import { useTeamData } from './hooks/useTeamData';

const GraphSection = () => {
  console.log("Graph section")
  const projectId="1ED1BE08-1323-4D00-8E09-8A5765E9F5A8" //87199129-F8E0-472F-A7EC-E4A3C66D6FE2 //1ED1BE08-1323-4D00-8E09-8A5765E9F5A8
  const { activeTab, setActiveTab, selectedTeam, setSelectedTeam,selectedTime, setSelectedTime  } = useGraphSection(projectId);
  const {TeamData,error,loading} = useTeamData(projectId)

  console.log(TeamData);
  

  const teams = useMemo(() => [
    { id: 'project', label: 'Project' },
    { id: 'team1', label: 'Team 1' },
    { id: 'team2', label: 'Team 2' }
  ], []);

  


  return (
    <div className="graph-area">
      <div className="graph-titile">{getGraphTitle(activeTab,selectedTeam.teamName)}</div>
      <div className="graph-header">
        <div className="graph-tabs">
         <GraphSelector activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className='selecters'>
        <TimeSelector selectedTime={selectedTime} setSelectedTime={setSelectedTime} timeOptions={timeOptions}/>
        <TeamSelector selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} teams={TeamData}/>
        </div>

      </div>
      <div className="graph-placeholder">
        <GraphContainer type={activeTab} projectId={projectId} selectedTeam={selectedTeam} selectedTime={selectedTime}/>
      </div>
    </div>
  );
};

export default GraphSection;    