import { UIDisplayData } from '@aics/simularium-viewer';
import {
  getNewHiddenAgents,
} from '../selectors';
import { CheckboxState } from '../constants';
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

const { Checked, Unchecked } = CheckboxState;

describe('selection composed selectors', () => {
  describe('getNewHiddenAgents', () => {
    it('if previous checkboxState is Unchecked, return each agent mapped to an empty array', () => {
      const payload = getNewHiddenAgents(mockUIDisplayData, Checked);
      expect(payload).toEqual({
        agent1: [],
        agent2: [],
        agent3: [],
        agent4: [],
        agent5: [],
      });
    });
    it('if previous checkboxState is Checked, return empty object', () => {
      const payload = getNewHiddenAgents(mockUIDisplayData, Unchecked);
      expect(payload).toEqual({});
    });
  });
});
