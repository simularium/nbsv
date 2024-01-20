import * as React from 'react';

import CheckBoxRow from './CheckBoxRow';
import { UIDisplayEntry } from '@aics/simularium-viewer/type-declarations/simularium/SelectionInterface';
import { useEffect } from 'react';
import {
  DisplayAction,
  HiddenOrHighlightedState,
  SubAgentDisplayMaps,
  TopLevelDisplayStatus,
  UIVisibilityMap,
  ViewerVisibilityMap,
  ViewerVisibilityStates,
} from '../constants';
interface CheckBoxContentsProps {
  agent: UIDisplayEntry;
  currentVisibilityStates: ViewerVisibilityStates;
  setCurrentVisibilityStates: (
    visibilityStates: ViewerVisibilityStates
  ) => void;
}

// This is the highest level component that is agent specific,
// so it contains state variables, listeners, and handlers for
// the agents and subagents in relation to hiding and highlighting.
// Tried to strike a balance between readability and conciseness.
// There is no stylesheet for this component as its basically a data layer.

const CheckBoxContents: React.FunctionComponent<CheckBoxContentsProps> = (
  props: CheckBoxContentsProps
): JSX.Element => {
  const { agent, currentVisibilityStates, setCurrentVisibilityStates } = props;
  const { Inactive, Active, Indeterminate } = HiddenOrHighlightedState;
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

  const displayStates = agent.displayStates.map((entry) => entry.name);

  // Set default states for subagents on load
  // Name and number of subagents aren't known when
  // declaring maps above
  useEffect(() => {
    updateSubAgentDisplayMaps();
  }, []);

  // Listener/setters for changes to hidden/highlighted agents/subagents
  useEffect(() => {
    updateTopLevelDisplayStatus();
    if (displayStates.length > 0) {
      updateSubAgentDisplayMaps();
    }
  }, [currentVisibilityStates]);

  // display status update functions
  const updateTopLevelDisplayStatus = () => {
    let newDisplayStatus = { ...topLevelDisplayStatus };
    for (const key in currentVisibilityStates) {
      const viewerStatusMap =
        currentVisibilityStates[key as keyof ViewerVisibilityStates];
      let status: HiddenOrHighlightedState = Inactive;
      if (Object.keys(viewerStatusMap).includes(agent.name)) {
        if (
          viewerStatusMap[agent.name].length === displayStates.length ||
          viewerStatusMap[agent.name].length === 0
        ) {
          status = Active;
        } else {
          status = Indeterminate;
        }
      }
      if (key === Hide) {
        newDisplayStatus = {
          ...newDisplayStatus,
          hidden: status,
        };
      }
      if (key === Highlight) {
        newDisplayStatus = {
          ...newDisplayStatus,
          highlight: status,
        };
      }
    }
    setTopLevelDisplayStatus(newDisplayStatus);
  };

  const updateSubAgentDisplayMaps = () => {
    const newSubAgentDisplayMaps = {
      hidden: getSubAgentDisplayStateMap(
        subAgentDisplayMaps[Hide],
        currentVisibilityStates.hidden
      ),
      highlight: getSubAgentDisplayStateMap(
        subAgentDisplayMaps[Highlight],
        currentVisibilityStates.highlight
      ),
    };
    setSubAgentDisplayMaps(newSubAgentDisplayMaps);
  };

  const getSubAgentDisplayStateMap = (
    UIStatusMap: UIVisibilityMap,
    viewerStatusMap: ViewerVisibilityMap
  ) => {
    const newSubAgentMap = { ...UIStatusMap };
    agent.displayStates.forEach((state) => {
      let subAgentStatus = Inactive;
      if (viewerStatusMap[agent.name] !== undefined) {
        if (
          viewerStatusMap[agent.name].includes(state.name) ||
          viewerStatusMap[agent.name].length === 0
        ) {
          subAgentStatus = Active;
        }
      }
      newSubAgentMap[state.name] = subAgentStatus;
    });
    return newSubAgentMap;
  };

  // get payloads for hidden/highlight status changes
  const getPayloadTopLevelDisplayAction = (
    key: string,
    topLevelStatus: HiddenOrHighlightedState,
    currentAgentSelectionMap: ViewerVisibilityMap
  ) => {
    const newSelection = { ...currentAgentSelectionMap };
    const hideAll = topLevelStatus !== Inactive;
    let values: string[] = [];
    if (!hideAll && displayStates.length > 0) {
      values = [...displayStates];
    }
    if (currentAgentSelectionMap[key]) {
      delete newSelection[key];
    } else {
      newSelection[key] = [...values];
    }
    return newSelection;
  };

  const getPayloadSubAgentDisplayAction = (
    key: string,
    // subAgentStatus: HiddenOrHighlightedState,
    currentAgentSelectionMap: ViewerVisibilityMap
  ) => {
    const newSelection = { ...currentAgentSelectionMap };
    let itemEntry: string[] = [];

    if (currentAgentSelectionMap[agent.name] !== undefined) {
      itemEntry = currentAgentSelectionMap[agent.name];

      if (itemEntry.includes(key)) {
        newSelection[agent.name] = itemEntry.filter((value) => value !== key);
        if (newSelection[agent.name].length === 0) {
          delete newSelection[agent.name];
          return newSelection;
        }
      }
    }
    newSelection[agent.name] = [...itemEntry, key];
    return newSelection;
  };

  // handles hide/highlight actions for toplevel or subagents
  const handleDisplayAction = (
    key: string,
    topLevel: boolean,
    hideOrHighlight: DisplayAction
  ) => {
    const selectionMap = currentVisibilityStates[hideOrHighlight];
    let newValue: ViewerVisibilityMap = {};
    if (topLevel) {
      const currentTopLevelDisplayStatus =
        topLevelDisplayStatus[hideOrHighlight];
      newValue = getPayloadTopLevelDisplayAction(
        key,
        currentTopLevelDisplayStatus,
        selectionMap
      );
    } else {
      newValue = getPayloadSubAgentDisplayAction(key, selectionMap);
    }
    if (hideOrHighlight === Hide) {
      setCurrentVisibilityStates({
        ...currentVisibilityStates,
        hidden: newValue,
      });
    } else if (hideOrHighlight === Highlight) {
      setCurrentVisibilityStates({
        ...currentVisibilityStates,
        highlight: newValue,
      });
    }
  };

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
        handleDisplayAction={handleDisplayAction}
      />
      {showSubAgentRows && (
        <>
          {agent.displayStates.map((state) => (
            <CheckBoxRow
              agent={state}
              isTopLevel={false}
              hasSubAgents={false}
              hiddenStatus={subAgentDisplayMaps[Hide][state.name]}
              highlightStatus={subAgentDisplayMaps[Highlight][state.name]}
              showSubAgentRows={showSubAgentRows}
              handleShowSubAgentRows={handleShowSubAgentRows}
              handleDisplayAction={handleDisplayAction}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CheckBoxContents;
