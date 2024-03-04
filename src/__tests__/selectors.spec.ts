import { UIDisplayData } from '@aics/simularium-viewer';
import {
  getPayloadForHideAll,
} from '../selectors';
import { ActiveState } from '../constants';
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

const { Active, Inactive, Indeterminate } = ActiveState;

describe('selection composed selectors', () => {
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
});
