import { getSelectionStateInfo } from '../selectors';

  const mockVisibilitySelectionMap = {
    agent1: ['state1'],
    agent2: ['state1', 'state2'],
    agent3: [],
  };

describe('selection composed selectors', () => {
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
          tags: ['state1'],
        },
        {
          name: 'agent2',
          tags: ['state1', 'state2'],
        },
        {
          name: 'agent3',
          tags: [],
        },
      ]);
    });
  });
});
