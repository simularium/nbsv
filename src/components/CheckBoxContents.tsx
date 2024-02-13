import React, { useContext, useEffect } from 'react';

import {
  DisplayAction,
  HiddenOrHighlightedState,
  SubAgentDisplayMaps,
  TopLevelDisplayStatus,
  UIDisplayEntry,
} from '../constants';
import { VisibilityContext } from '../AgentVisibilityContext';
import CheckBoxRow from './CheckBoxRow';
interface CheckBoxContentsProps {
  agent: UIDisplayEntry;
}

const CheckBoxContents: React.FunctionComponent<CheckBoxContentsProps> = (
  props: CheckBoxContentsProps
): JSX.Element => {
  const { agent } = props;
  const { Inactive } = HiddenOrHighlightedState;
  const { Hide, Highlight } = DisplayAction;

  const [showSubAgentRows, setShowSubAgentsRows] =
    React.useState<boolean>(false);
  const [subAgentDisplayMaps, setSubAgentDisplayMaps] =
    React.useState<SubAgentDisplayMaps>({ hidden: {}, highlight: {} });
  const [topLevelDisplayStatus, setTopLevelDisplayStatus] =
    React.useState<TopLevelDisplayStatus>({
      hidden: Inactive,
      highlight: Inactive,
    });

  const {
    currentVisibilityStates,
    updateTopLevelDisplayStatus,
    updateSubAgentDisplayMaps,
  } = useContext(VisibilityContext);

  const displayStates = agent.displayStates.map((entry) => entry.name);

  // Set default states for subagents on load
  // Name and number of subagents aren't known when
  // initializing maps
  useEffect(() => {
    updateSubAgentDisplayMaps(agent);
  }, []);

  // Listener/setters for changes to hidden/highlighted agents/subagents
  useEffect(() => {
    const newTopLevelStatus = updateTopLevelDisplayStatus(agent);
    setTopLevelDisplayStatus(newTopLevelStatus);
    if (displayStates.length > 0) {
      const newSubAgentDisplayMaps = updateSubAgentDisplayMaps(agent);
      setSubAgentDisplayMaps(newSubAgentDisplayMaps);
    }
  }, [currentVisibilityStates]);

  // display state handler
  const handleShowSubAgentRows = (value: boolean) => {
    setShowSubAgentsRows(value);
  };

  return (
    <div>
      <CheckBoxRow
        agent={agent}
        isTopLevel={true}
        hiddenStatus={topLevelDisplayStatus[Hide]}
        highlightStatus={topLevelDisplayStatus[Highlight]}
        hasSubAgents={displayStates.length > 0}
        showSubAgentRows={showSubAgentRows}
        handleShowSubAgentRows={handleShowSubAgentRows}
      />
      {showSubAgentRows && (
        <>
          {agent.displayStates.map((subAgent) => (
            <CheckBoxRow
              agent={agent}
              subAgent={subAgent}
              isTopLevel={false}
              hasSubAgents={false}
              hiddenStatus={subAgentDisplayMaps[Hide][subAgent.name]}
              highlightStatus={subAgentDisplayMaps[Highlight][subAgent.name]}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CheckBoxContents;
