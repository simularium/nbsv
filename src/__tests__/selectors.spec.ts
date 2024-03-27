import { UIDisplayData } from '@aics/simularium-viewer';
import { getNewHiddenAgents, getSelectionStateInfo } from '../selectors';

const mockVisibilitySelectionMap = {
  agent1: ['agent1'],
  agent2: ['agent2'],
  agent3: [],
};

const mockUIDisplayData: UIDisplayData = [
  {
    name: 'agent1',
    displayStates: [],
    color: '#000000',
  },
  {
    name: 'agent2',
    displayStates: [],
    color: '#000000',
  },
  {
    name: 'agent3',
    displayStates: [],
    color: '#000000',
  },
];

// todo fix this test to match current function
describe('selection composed selectors', () => {
  describe('getNewHiddenAgents', () => {
    it('it has each agent from uidisplaydata in visibility map and nothing else', () => {
      const payload = getNewHiddenAgents('agent1', mockVisibilitySelectionMap);
      mockUIDisplayData.forEach(({ name }) => {
        expect(payload).toHaveProperty(name);
      });
      expect(Object.keys(payload)).toHaveLength(mockUIDisplayData.length);
    });
    it('it adds provided agent to value array if array was previously empty', () => {
      const payload = getNewHiddenAgents('agent3', mockVisibilitySelectionMap);
      expect(payload).toEqual({
        agent1: ['agent1'],
        agent2: ['agent2'],
        agent3: ['agent3'],
      });
    });
    it('it removes agent name from value array if name was previously in array', () => {
      const payload = getNewHiddenAgents('agent1', mockVisibilitySelectionMap);
      expect(payload).toEqual({
        agent1: [],
        agent2: ['agent2'],
        agent3: [],
      });
    });
  });

  describe('getSelectionStateInfo', () => {
    it('returns an array of SelectionEntry objects', () => {
      const payload = getSelectionStateInfo(mockVisibilitySelectionMap);
      expect(Array.isArray(payload)).toBe(true);
      expect(
        payload.every(
          (entry) =>
            typeof entry === 'object' && 'name' in entry && 'tags' in entry
        )
      ).toBe(true);
    });

    it('returns an empty array if given an empty object', () => {
      const payload = getSelectionStateInfo({});
      expect(payload).toEqual([]);
    });

    it('returns selection entries with empty tags arrays for visibility selections with empty array values', () => {
      const payload = getSelectionStateInfo({
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
      const payload = getSelectionStateInfo(mockVisibilitySelectionMap);
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
      ]);
    });
  });
});
