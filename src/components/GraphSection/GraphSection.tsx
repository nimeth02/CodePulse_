import './GraphSection.scss';
import GraphContainer from './GraphContainer';
import {getGraphTitle, timeOptions } from './Constants/graphConstants'
import { useGraphSection} from './hooks/useGraphSectionData'
import TeamSelector from './Selectors/TeamSelector';
import GraphSelector from './Selectors/GraphSelector';
import TimeSelector from './Selectors/TimeSelector';

const GraphSection = ({projectId}:{projectId:string}) => {
  console.log("Graph section")
   //87199129-F8E0-472F-A7EC-E4A3C66D6FE2 //1ED1BE08-1323-4D00-8E09-8A5765E9F5A8
  const { activeTab, setActiveTab, selectedTeam, setSelectedTeam,selectedTime, setSelectedTime  } = useGraphSection(projectId);


  
  return (
    <div className="graph-area">
      <div className="graph-titile">{getGraphTitle(activeTab,selectedTeam.teamName)}</div>
      <div className="graph-header">
        <div className="graph-tabs">
         <GraphSelector activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className='selecters'>
        <TimeSelector selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
        <TeamSelector selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} projectId={projectId}/>
        </div>

      </div>
      <div className="graph-placeholder">
        <GraphContainer type={activeTab} projectId={projectId} selectedTeam={selectedTeam} selectedTime={selectedTime}/>
      </div>
    </div>
  );
};

export default GraphSection;    