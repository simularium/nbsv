import { UIDisplayData } from '@aics/simularium-viewer';
import {
  getPayloadForHideAll,
  getPayloadSubAgentDisplayAction,
  getPayloadTopLevelDisplayAction,
  getSubAgentDisplayStateMap,
  getTopLevelDisplayStatus,
} from '../selectors';
import { DisplayAction, HiddenOrHighlightedState } from '../constants';
const mockUIDisplayData: UIDisplayData = [
  {
    name: 'agent1',
    displayStates: [
      {
        name: 'state1',
        id: 'state1',
        color: '#000000',
      },
    ],
    color: '#000000',
  },
  {
    name: 'agent2',
    displayStates: [
      {
        name: 'state1',
        id: 'state1',
        color: '#000000',
      },
      {
        name: 'state2',
        id: 'state2',
        color: '#000000',
      },
    ],
    color: '#000000',
  },
  {
    name: 'agent3',
    displayStates: [],
    color: '#000000',
  },
  {
    name: 'agent4',
    displayStates: [
      {
        name: 'state1',
        id: 'state1',
        color: '#000000',
      },
      {
        name: 'state2',
        id: 'state2',
        color: '#000000',
      },
      {
        name: 'state3',
        id: 'state3',
        color: '#000000',
      },
    ],
    color: '#000000',
  },
  {
    name: 'agent5',
    displayStates: [
      {
        name: 'state1',
        id: 'state1',
        color: '#000000',
      },
      {
        name: 'state2',
        id: 'state2',
        color: '#000000',
      },
      {
        name: 'state3',
        id: 'state3',
        color: '#000000',
      },
    ],
    color: '#000000',
  },
];

const mockViewerVisibilityStates = {
  hidden: {},
  highlight: {
    agent1: ['state1'],
    agent2: ['state1'],
    agent3: [],
    agent4: [],
    agent5: ['state1', 'state2'],
  },
};

const { Hide, Highlight } = DisplayAction;
const { Active, Inactive, Indeterminate } = HiddenOrHighlightedState;

describe('selection composed selectors', () => {
  describe('getTopLevelDisplayStatus', () => {
    it('returns Inactive if the agent is not in the viewerStatusMap', () => {
      const agent = mockUIDisplayData[0]; // agent1
      const viewerStatusMap = mockViewerVisibilityStates[Hide]; // empty map
      const status = getTopLevelDisplayStatus(agent, viewerStatusMap);
      expect(status).toEqual('Inactive');
    });
    it('returns Active if all display states of the agent are in the viewerStatusMap', () => {
      const agent = mockUIDisplayData[0]; // agent1, has state1
      const viewerStatusMap = mockViewerVisibilityStates[Highlight]; // agent1, state1 is in map
      const status = getTopLevelDisplayStatus(agent, viewerStatusMap);
      expect(status).toEqual('Active');
    });
    it('returns Indeterminate if some but not all display states are in the viewerStatusMap', () => {
      const agent = mockUIDisplayData[1]; // agent2, has state1 and state2
      const viewerStatusMap = mockViewerVisibilityStates[Highlight]; // agent2, state1 is in map
      const status = getTopLevelDisplayStatus(agent, viewerStatusMap);
      expect(status).toEqual('Indeterminate');
    });
    it('returns Active if the viewerStatusMap entry is an empty array', () => {
      const agent = mockUIDisplayData[2]; // agent3, no display states
      const viewerStatusMap = mockViewerVisibilityStates[Highlight]; 
      const status = getTopLevelDisplayStatus(agent, viewerStatusMap);
      expect(status).toEqual('Active');
    });
  });
  describe('getSubAgentDisplayStateMap', () => {
    it('if agent has no displayStates, the map will be empty', () => {
      const agent = mockUIDisplayData[2];
      const viewerStatusMap = mockViewerVisibilityStates[Highlight];
      const subAgentMap = getSubAgentDisplayStateMap(agent, viewerStatusMap);
      expect(subAgentMap).toEqual({});
    });
    it('if an agent has displyStates, the map will have a key for each subagent', () => {
      const agent = mockUIDisplayData[1];
      const viewerStatusMap = mockViewerVisibilityStates[Highlight];
      const subAgentMap = getSubAgentDisplayStateMap(agent, viewerStatusMap);
      const keys = Object.keys(subAgentMap);
      expect(keys).toEqual(agent.displayStates.map((state) => state.name));
    });
    it('if the agents is not in the viewerStatusMap, all subagents will be Inactive', () => {
      const agent = mockUIDisplayData[1];
      const viewerStatusMap = mockViewerVisibilityStates[Hide];
      const subAgentMap = getSubAgentDisplayStateMap(agent, viewerStatusMap);
      expect(subAgentMap).toEqual({
        state1: Inactive,
        state2: Inactive,
      });
    });
    it('if the agents is in the viewerStatusMap, and mapped array of states is empty, all agents will be active', () => {
      const agent = mockUIDisplayData[3];
      const viewerStatusMap = mockViewerVisibilityStates[Highlight];
      const subAgentMap = getSubAgentDisplayStateMap(agent, viewerStatusMap);
      expect(subAgentMap).toEqual({
        state1: Active,
        state2: Active,
        state3: Active,
      });
    });
    it('if the agents is in the viewerStatusMap, and mapped array of states has entries, all displayStates in array will be active, all displayStates not in array will be inactive', () => {
      const agent = mockUIDisplayData[1];
      const viewerStatusMap = mockViewerVisibilityStates[Highlight];
      const subAgentMap = getSubAgentDisplayStateMap(agent, viewerStatusMap);
      expect(subAgentMap).toEqual({ state1: Active, state2: Inactive });
    });
  });
  describe('getPayloadForHideAll', () => {
    it('if hiddenState is Inactive, return each agent mapped to an empty array', () => {
      const payload = getPayloadForHideAll(mockUIDisplayData, Inactive);
      expect(payload).toEqual({
        agent1: [],
        agent2: [],
        agent3: [],
        agent4: [],
        agent5: [],
      });
    });
    it('if hiddenState is Active, return empty object', () => {
      const payload = getPayloadForHideAll(mockUIDisplayData, Active);
      expect(payload).toEqual({});
    });
    it('if hiddenState is Indeterminate, return empty object', () => {
      const payload = getPayloadForHideAll(mockUIDisplayData, Indeterminate);
      expect(payload).toEqual({});
    });
  });
  describe('getPayloadTopLevelDisplayAction', () => {
    it('if agent w no display states is currently in map, return input map minus agent', () => {
      const agent = mockUIDisplayData[2]; // agent3, no display states
      const map = mockViewerVisibilityStates[Highlight]; // agent3 is in map
      const payload = getPayloadTopLevelDisplayAction(agent, map);
      expect(payload).toEqual({
        agent1: ['state1'],
        agent2: ['state1'],
        agent4: [],
        agent5: ['state1', 'state2'],
      });
    });
    it('if agent w no display states is not in map, return input map with agent and empty array', () => {
      const agent = mockUIDisplayData[2]; // agent3, no display states
      const map = mockViewerVisibilityStates[Hide]; // empty map
      const payload = getPayloadTopLevelDisplayAction(agent, map);
      expect(payload).toEqual({
        agent3: [],
      });
    });
    it('if agent w display states is currently in map, return input map minus agent', () => {
      const agent = mockUIDisplayData[4]; // agent5 has state1 state2 state3
      const map = mockViewerVisibilityStates[Highlight]; // agent 5: state1 and state2 are in map 
      const payload = getPayloadTopLevelDisplayAction(agent, map);
      expect(payload).toEqual({
        agent1: ['state1'],
        agent2: ['state1'],
        agent3: [],
        agent4: [],
      });
    });
    it('if agent w display states is not in map, return input map with agent and all display states', () => {
      const agent = mockUIDisplayData[4]; // agent5 has state1 state2 state3
      const map = mockViewerVisibilityStates[Hide]; // empty map
      const payload = getPayloadTopLevelDisplayAction(agent, map);
      expect(payload).toEqual({
        agent5: ['state1', 'state2', 'state3'],
      });
    });
  });
  describe('getPayloadSubAgentDisplayAction', () => {
    it('if agent has no entry in selection map, return new map with agent name entry, with subagent as only value in array', () => {
      const agent = mockUIDisplayData[1]; // agent 2
      const subAgent = agent.displayStates[0]; // state1
      const map = mockViewerVisibilityStates[Hide]; // empty map
      const payload = getPayloadSubAgentDisplayAction(agent, subAgent, map);
      expect(payload).toEqual({
        agent2: ['state1'],
      });
    });
    it('if agent has entry in selection map, and subAgent not present in entry, return map with subagent added to agent entry', () => {
      const agent = mockUIDisplayData[1]; // agent2
      const subAgent = agent.displayStates[1]; // state2
      const map = mockViewerVisibilityStates[Highlight]; // only has state1 in array
      const payload = getPayloadSubAgentDisplayAction(agent, subAgent, map);
      expect(payload).toEqual({
        agent1: ['state1'],
        agent2: ['state1', 'state2'],
        agent3: [],
        agent4: [],
        agent5: ['state1', 'state2'],
      });
    });
    it('if agent has entry in selection map, subAgent and other values are in entry, return map with subAgent removed from entry', () => {
      const agent = mockUIDisplayData[4]; // agent5, has 4 display states
      const subAgent = agent.displayStates[0]; // state1
      const map = mockViewerVisibilityStates[Highlight]; // state1 and state2 are in map
      const payload = getPayloadSubAgentDisplayAction(agent, subAgent, map);
      expect(payload).toEqual({
        agent1: ['state1'],
        agent2: ['state1'],
        agent3: [],
        agent4: [],
        agent5: ['state2'],
      });
    });
    it('if agent has entry in selection map, subAgent is only value in entry, return map with agent entry removed', () => {
      const agent = mockUIDisplayData[0]; // agent1, has 1 display state
      const subAgent = agent.displayStates[0]; // state1
      const map = mockViewerVisibilityStates[Highlight]; // state1 is in map
      const payload = getPayloadSubAgentDisplayAction(agent, subAgent, map);
      expect(payload).toEqual({
        agent2: ['state1'],
        agent3: [],
        agent4: [],
        agent5: ['state1', 'state2'],
      });
    });
  });
});
