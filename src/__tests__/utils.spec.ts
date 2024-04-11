import { UIDisplayData } from '@aics/simularium-viewer';
import {
  convertMapToSelectionStateInfo,
  getNewMapAfterDisplayStateClick,
  getNewMapAfterTopLevelCheckboxClick,
} from '../utils';

const mockVisibilitySelectionMap = {
  agent1: ['agent1'],
  agent2: ['agent2'],
  agent3: [],
  agent4: ['state1', 'state2'],
  agent5: ['state1'],
};

const mockUIDisplayData: UIDisplayData = [
  {
    name: 'agent1',
    displayStates: [
      { name: 'state1', id: '1', color: '#000000' },
      { name: 'state2', id: '2', color: '#000000' },
      { name: 'state3', id: '3', color: '#000000' },
    ],
    color: '#000000',
  },
  {
    name: 'agent2',
    displayStates: [],
    color: '#000000',
  },
  {
    name: 'agent3',
    displayStates: [
      { name: 'state1', id: '1', color: '#000000' },
      { name: 'state2', id: '2', color: '#000000' },
      { name: 'state3', id: '3', color: '#000000' },
    ],
    color: '#000000',
  },
  {
    name: 'agent4',
    displayStates: [
      { name: 'state1', id: '1', color: '#000000' },
      { name: 'state2', id: '2', color: '#000000' },
      { name: 'state3', id: '3', color: '#000000' },
    ],
    color: '#000000',
  },
  {
    name: 'agent5',
    displayStates: [
      { name: 'state1', id: '1', color: '#000000' },
      { name: 'state2', id: '2', color: '#000000' },
      { name: 'state3', id: '3', color: '#000000' },
    ],
    color: '#000000',
  },
];

describe('utils for converting selection data types and handling selection actions', () => {
  describe('getNewMapAfterTopLevelCheckboxClick', () => {
    it('it has each agent from uidisplaydata in visibility map and nothing else', () => {
      const payload = getNewMapAfterTopLevelCheckboxClick(
        'agent1',
        mockVisibilitySelectionMap
      );
      mockUIDisplayData.forEach(({ name }) => {
        expect(payload).toHaveProperty(name);
      });
      expect(Object.keys(payload)).toHaveLength(mockUIDisplayData.length);
    });
    it('it adds provided agent to value array if array was previously empty', () => {
      const payload = getNewMapAfterTopLevelCheckboxClick(
        'agent3',
        mockVisibilitySelectionMap
      );
      expect(payload).toEqual({
        agent1: ['agent1'],
        agent2: ['agent2'],
        agent3: ['agent3'],
        agent4: ['state1', 'state2'],
        agent5: ['state1'],
      });
    });
    it('it removes agent name from value array if name was previously in array', () => {
      const payload = getNewMapAfterTopLevelCheckboxClick(
        'agent1',
        mockVisibilitySelectionMap
      );
      expect(payload).toEqual({
        agent1: [],
        agent2: ['agent2'],
        agent3: [],
        agent4: ['state1', 'state2'],
        agent5: ['state1'],
      });
    });
        it('it removes displaystates and replaces them with empty array', () => {
          const payload = getNewMapAfterTopLevelCheckboxClick(
            'agent4',
            mockVisibilitySelectionMap
          );
          expect(payload).toEqual({
            agent1: ['agent1'],
            agent2: ['agent2'],
            agent3: [],
            agent4: ['agent4'],
            agent5: ['state1'],
          });
        });
  });

  describe('getNewMapAfterDisplayStateClick', () => {
    it('if selection array is empty, it fills its with all display states except the one that was clicked', () => {
      const payload = getNewMapAfterDisplayStateClick(
        'agent3',
        'state1',
        ['state1', 'state2', 'state3'],
        mockVisibilitySelectionMap
      );
      expect(payload).toEqual({
        agent1: ['agent1'],
        agent2: ['agent2'],
        agent3: ['state2', 'state3'],
        agent4: ['state1', 'state2'],
        agent5: ['state1'],
      });
    });
    it('if display state is selected among other display states, it should be removed from selection array', () => {
      const payload = getNewMapAfterDisplayStateClick(
        'agent4',
        'state1',
        ['state1', 'state2', 'state3'],
        mockVisibilitySelectionMap
      );
      expect(payload).toEqual({
        agent1: ['agent1'],
        agent2: ['agent2'],
        agent3: [],
        agent4: ['state2'],
        agent5: ['state1'],
      });
    });
    it('if clicked display state is the only current selection, it should return an array with the agent name', () => {
      const payload = getNewMapAfterDisplayStateClick(
        'agent5',
        'state1',
        ['state1', 'state2', 'state3'],
        mockVisibilitySelectionMap
      );
      expect(payload).toEqual({
        agent1: ['agent1'],
        agent2: ['agent2'],
        agent3: [],
        agent4: ['state1', 'state2'],
        agent5: ['agent5'],
      });
    });
    it('if display state is clicked and selection array currently has agent name, replace it with display state name', () => {
      const payload = getNewMapAfterDisplayStateClick(
        'agent1',
        'state1',
        ['state1', 'state2', 'state3'],
        mockVisibilitySelectionMap
      );
      expect(payload).toEqual({
        agent1: ['state1'],
        agent2: ['agent2'],
        agent3: [],
        agent4: ['state1', 'state2'],
        agent5: ['state1'],
      });
    });
    it('if adding clicked display state means all display states are selected, make selection array empty', () => {
      const payload = getNewMapAfterDisplayStateClick(
        'agent4',
        'state3',
        ['state1', 'state2', 'state3'],
        mockVisibilitySelectionMap
      );
      expect(payload).toEqual({
        agent1: ['agent1'],
        agent2: ['agent2'],
        agent3: [],
        agent4: [],
        agent5: ['state1'],
      });
    });
    it('if adding clicked display state is leaves at least one display state unselected, add clicked state to array', () => {
      const payload = getNewMapAfterDisplayStateClick(
        'agent5',
        'state2',
        ['state1', 'state2', 'state3'],
        mockVisibilitySelectionMap
      );
      expect(payload).toEqual({
        agent1: ['agent1'],
        agent2: ['agent2'],
        agent3: [],
        agent4: ['state1', 'state2'],
        agent5: ['state1', 'state2'],
      });
    });
  });


  describe('convertMapToSelectionStateInfo', () => {
    it('returns an array of SelectionEntry objects', () => {
      const payload = convertMapToSelectionStateInfo(
        mockVisibilitySelectionMap
      );
      expect(Array.isArray(payload)).toBe(true);
      expect(
        payload.every(
          (entry) =>
            typeof entry === 'object' && 'name' in entry && 'tags' in entry
        )
      ).toBe(true);
    });

    it('returns an empty array if given an empty object', () => {
      const payload = convertMapToSelectionStateInfo({});
      expect(payload).toEqual([]);
    });

    it('returns selection entries with empty tags arrays for visibility selections with empty array values', () => {
      const payload = convertMapToSelectionStateInfo({
        agent1: [],
        agent2: [],
      });
      expect(payload).toEqual([
        {
          name: 'agent1',
          tags: [],
        },
        {
          name: 'agent2',
          tags: [],
        },
      ]);
    });
    it('returns tags arrays with values when visibility selections have non-empty array values', () => {
      const payload = convertMapToSelectionStateInfo(
        mockVisibilitySelectionMap
      );
      expect(payload).toEqual([
        {
          name: 'agent1',
          tags: ['agent1'],
        },
        {
          name: 'agent2',
          tags: ['agent2'],
        },
        {
          name: 'agent3',
          tags: [],
        },
        {
          name: 'agent4',
          tags: ['state1', 'state2'],
        },
        {
          name: 'agent5',
          tags: ['state1'],
        },
      ]);
    });
});
});