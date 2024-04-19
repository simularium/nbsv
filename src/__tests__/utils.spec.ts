import {
  convertMapToSelectionStateInfo,
  getSelectionAfterChildCheckboxClick,
  updateUserChangesAfterCheckboxClick,
  getChildren,
  getInitialUserSelections,
} from '../utils';

describe('utils for converting selection data types and handling selection actions', () => {
  describe('updateUserChangesAfterCheckboxClick', () => {
    it('removes an agent with no children from selection if it was previously included', () => {
      const result = updateUserChangesAfterCheckboxClick(
        'agent_with_no_children',
        [],
        {
          agent_with_no_children: ['agent_with_no_children'],
        }
      );
      expect(result).toEqual({ agent_with_no_children: [] });
    });
    it('it adds an agent with no children to selection if it was was not previously included in selection', () => {
      const result = updateUserChangesAfterCheckboxClick(
        'agent_with_no_children',
        [],
        {
          agent_with_no_children: [],
        }
      );
      expect(result).toEqual({
        agent_with_no_children: ['agent_with_no_children'],
      });
    });
    it('removes an agents children from selection if they were previously selected', () => {
      const result = updateUserChangesAfterCheckboxClick(
        'agent_with_children',
        ['child1', 'child2'],
        {
          agent_with_children: ['child1', 'child2'],
        }
      );
      expect(result).toEqual({
        agent_with_children: [],
      });
    });
    it('selects agents children if they were not previously selected', () => {
      const childList = ['child1', 'child2'];
      const result = updateUserChangesAfterCheckboxClick(
        'agent_with_children',
        childList,
        {
          agent_with_children: [],
        }
      );
      expect(result).toEqual({
        agent_with_children: childList,
      });
    });
    it('it includes all children in selection if only some were previously selected', () => {
      const childList = ['child1', 'child2'];
      const result = updateUserChangesAfterCheckboxClick(
        'agent_with_children',
        childList,
        {
          agent_with_children: ['child1'],
        }
      );
      expect(result).toEqual({
        agent_with_children: childList,
      });
    });
  });

  describe('getSelectionAfterChildCheckboxClick', () => {
    it('removes child from parents selection array if it was previously included', () => {
      const result = getSelectionAfterChildCheckboxClick('child', 'parent', {
        parent: ['child'],
      });
      expect(result).toEqual({ parent: [] });
    });
    it('adds child to parents selection array if child was not previously included', () => {
      const result = getSelectionAfterChildCheckboxClick('child', 'parent', {
        parent: ['child2'],
      });
      expect(result).toEqual({ parent: ['child2', 'child'] });
    });
    it('will throw an error if the parent is not found in the userChangesMap', () => {
      expect(() => {
        getSelectionAfterChildCheckboxClick('child', 'parent', {});
      }).toThrow('Parent not found in map');
    });
  });

  describe('getChildren', () => {
    it('returns the display states for an agent', () => {
      const agent = {
        name: 'name',
        displayStates: [{ name: 'state1', id: '1', color: '#000000' }],
        color: '#000000',
      };
      const result = getChildren(agent);
      expect(result).toEqual(['1']);
    });
    it('returns an empty array if the agent has no display states', () => {
      const agent = {
        name: 'name',
        displayStates: [],
        color: '#000000',
      };
      const result = getChildren(agent);
      expect(result).toEqual([]);
    });
  });

  describe('convertMapToSelectionStateInfo', () => {
    it('should return a selection entry with an empty tags array if agent name is in user changes map and has agent name in array', () => {
      const agent = {
        name: 'agent_no_children',
        displayStates: [],
        color: '#000000',
      };
      const result = convertMapToSelectionStateInfo(
        { agent_no_children: ['agent_no_children'] },
        [agent]
      );
      expect(result).toEqual([{ name: 'agent_no_children', tags: [] }]);
    });
    it('should return no selection entry for an agent without children if the user changes map array is empty', () => {
      const agent = {
        name: 'agent_no_children',
        displayStates: [],
        color: '#000000',
      };
      const result = convertMapToSelectionStateInfo({ agent_no_children: [] }, [
        agent,
      ]);
      expect(result).toEqual([]);
    });
    it('should include all the display states currently in the userChangesMap in the tags array of the selection entry', () => {
      const agent = {
        name: 'agent_with_children',
        displayStates: [
          { name: 'state1', id: '1', color: '#000000' },
          { name: 'state2', id: '2', color: '#000000' },
        ],
        color: '#000000',
      };
      const result = convertMapToSelectionStateInfo(
        { agent_with_children: ['1'] },
        [agent]
      );
      expect(result).toEqual([{ name: 'agent_with_children', tags: ['1'] }]);
    });
    it('should return no selection entry if no display states are in the userChangesMap', () => {
      const agent = {
        name: 'agent_with_children',
        displayStates: [
          { name: 'state1', id: '1', color: '#000000' },
          { name: 'state2', id: '2', color: '#000000' },
        ],
        color: '#000000',
      };
      const result = convertMapToSelectionStateInfo(
        { agent_with_children: [] },
        [agent]
      );
      expect(result).toEqual([]);
    });
  });
  describe('getInitialUserSelections', () => {
    it('should make an entry for each agent with an empty array as its value', () => {
      const uiData = [
        {
          name: 'agent_with_no_children',
          displayStates: [],
          color: '#000000',
        },
      ];
      const result = getInitialUserSelections(uiData);
      expect(result).toEqual({
        agent_with_no_children: [],
      });
    });
  });
});
