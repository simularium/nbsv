import * as React from 'react';

import '../../css/checkBoxTree.css';
import { CheckboxOptionType, Col, Row, Typography } from 'antd';
import { map, filter, isEmpty } from 'lodash';
import SharedCheckbox from './SharedCheckBox';
import TreeNode from './TreeNode';
import ColorSwatch from './ColorSwatch';
import Checkbox from './CheckBox';
// import { SelectionEntry } from '@aics/simularium-viewer/type-declarations/simularium/SelectionInterface';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import CheckboxTreeSubmenu from './CheckBoxTreeSubmenu';
// import { UIDisplayData } from '@aics/simularium-viewer';

const { Text } = Typography;

export const CHECKBOX_TYPE_STAR = 'star';
export type CHECKBOX_TYPE_STAR = typeof CHECKBOX_TYPE_STAR;

export interface SelectionEntry {
  name: string;
  tags: string[];
}

interface CheckBoxWithColor extends CheckboxOptionType {
  color: string;
}

export interface AgentDisplayNode {
  title: string;
  key: string;
  children: CheckBoxWithColor[];
  color: string;
}

interface DisplayStateEntry {
  name: string;
  id: string;
  color: string;
}
export interface UIDisplayEntry {
  name: string;
  displayStates: DisplayStateEntry[];
  color: string;
}
export declare type UIDisplayData = UIDisplayEntry[];

export interface VisibilitySelectionMap {
  [key: string]: string[];
}

interface CheckBoxTreeProps {
  //   uiData: UIDisplayData;
  treeData: AgentDisplayNode[];
  agentsHighlighted: SelectionEntry[];
  visibleAgents: VisibilitySelectionMap;
  setVisibleAgents: (agents: VisibilitySelectionMap) => void;
  highlightedAgents: VisibilitySelectionMap;
  setHighlightedAgents: (agents: VisibilitySelectionMap) => void;
  agentsChecked: VisibilitySelectionMap;
  setAgentsChecked: (agents: VisibilitySelectionMap) => void;
}

export const getUiDisplayDataTree = (
  uiDisplayData: UIDisplayData
): AgentDisplayNode[] => {
  if (!uiDisplayData.length) {
    return [];
  }
  return uiDisplayData.map((agent) => ({
    title: agent.name,
    key: agent.name,
    color: agent.color,
    children: agent.displayStates.length
      ? [
          ...agent.displayStates.map((state) => ({
            label: state.name,
            value: state.id,
            color: state.color,
          })),
        ]
      : [],
  }));
};

const CHECKBOX_SPAN_NO = 2;
const LABEL_SPAN_NO = 6;

const CheckBoxTree: React.FunctionComponent<CheckBoxTreeProps> = (
  props: CheckBoxTreeProps
): JSX.Element => {
  //   console.log('CheckBoxTree log of uiData', props.uiData);

  console.log('CheckBoxTree log of treeData', props.treeData);

  const handleAgentCheck = props.setVisibleAgents;
  const handleHighlight = props.setHighlightedAgents;

  //payload for selectall and selectnone
  const getSelectAllVisibilityMap = (
    treeData: AgentDisplayNode[]
  ): VisibilitySelectionMap => {
    const returnData: VisibilitySelectionMap = {};
    return treeData.reduce((acc, agent: AgentDisplayNode) => {
      const { key } = agent;
      acc[key] = [];
      if (agent.children && agent.children.length) {
        acc[key] = agent.children.map(({ value }) => value as string);
      } else {
        acc[key] = [key];
      }
      return acc;
    }, returnData);
  };

  // Returns an agent visibility map that indicates no states should be visible
  const getSelectNoneVisibilityMap = (
    treeData: AgentDisplayNode[]
  ): VisibilitySelectionMap => {
    const returnData: VisibilitySelectionMap = {};
    return treeData.reduce((acc, agent) => {
      acc[agent.key] = [];
      return acc;
    }, returnData);
  };

  const payloadForSelectAll = getSelectAllVisibilityMap(props.treeData);
  const payloadForSelectNone = getSelectNoneVisibilityMap(props.treeData);
  console.log(payloadForSelectNone);
  const agentsChecked = payloadForSelectAll;

  //   const toggleAllOnOff = (checkedKeys: { [key: string]: string[] }) => {
  //     // const { setAgentsVisible, payloadForSelectNone, payloadForSelectAll } =
  //     //   this.props;
  //     if (!checkedKeys.All.length) {
  //       setAgentsVisible(payloadForSelectNone);
  //     } else {
  //       setAgentsVisible(payloadForSelectAll);
  //     }
  //   };

  const renderCheckAllButton = () => {
    //   const { agentsChecked, treeData, isSharedCheckboxIndeterminate } = this.props;
    const checkedList = filter(
      map(agentsChecked, (value, key): string => (value.length ? key : ''))
    );
    console.log('render check all button func', checkedList);
    return (
      <div className="checkAllCheckbox">
        <SharedCheckbox
          title="All"
          showLabel={true}
          options={map(props.treeData, 'key' as string)}
          //   onTopLevelCheck={this.toggleAllOnOff}
          onTopLevelCheck={console.log}
          //   indeterminate={isSharedCheckboxIndeterminate}
          indeterminate={getIsSharedCheckboxIndeterminate(
            props.treeData,
            agentsChecked
          )}
          checkedList={checkedList}
          isHeader={false}
        />
      </div>
    );
  };

  // Determines if the shared checkbox should be partially checked (in "indeterminate" state)
  const getIsSharedCheckboxIndeterminate = (
    allAgents: AgentDisplayNode[],
    agentVisibilityMap: VisibilitySelectionMap
  ): boolean => {
    if (isEmpty(agentVisibilityMap)) {
      return false;
    }

    let numInvisibleAgents = 0;

    // Loop through each agent and count how many are invisible. If an agent is partially
    // visible, just return true
    for (let i = 0; i < allAgents.length; i++) {
      const agent = allAgents[i];
      const visibleStates = agentVisibilityMap[agent.key];

      if (visibleStates === undefined) {
        // This should theoretically never happen
        console.warn(
          `Skipping agent ${agent.key} in getIsSharedCheckboxIndeterminate because it doesn't exist in agentVisibilityMap`
        );
        continue;
      }

      if (!visibleStates.length) {
        numInvisibleAgents++;
      } else if (visibleStates.length < agent.children.length) {
        return true;
      }
    }

    // Return true if some but not all agents are visible
    return numInvisibleAgents > 0 && numInvisibleAgents < allAgents.length;
  };

  const onTopLevelCheck = (checkedKeys: { [key: string]: string[] }) => {
    // const { handleAgentCheck } = this.props;
    handleAgentCheck(checkedKeys);
  };

  const onTopLevelHighlightChange = (checkedKeys: {
    [key: string]: string[];
  }) => {
    // const { handleHighlight } = this.props;
    handleHighlight(checkedKeys);
  };

  const renderSharedCheckboxes = (nodeData: AgentDisplayNode) => (
    <Row key="actions" className="checkboxSet">
      <Col span={12}>
        <SharedCheckbox
          title={nodeData.title}
          showLabel={false}
          checkboxType={CHECKBOX_TYPE_STAR}
          options={map(nodeData.children, 'value' as string)}
          onTopLevelCheck={onTopLevelHighlightChange}
          checkedList={props.highlightedAgents[nodeData.title] || []}
          isHeader={true}
        />
      </Col>
      <Col span={12}>
        <SharedCheckbox
          title={nodeData.title}
          showLabel={false}
          options={map(nodeData.children, 'value' as string)}
          onTopLevelCheck={onTopLevelCheck}
          checkedList={props.agentsChecked[nodeData.title] || []}
          isHeader={true}
        />
      </Col>
    </Row>
  );

  const renderRowWithNoChildren = (nodeData: AgentDisplayNode) => {
    // const { agentsChecked, agentsHighlighted } = this.props;
    const isHighlighted =
      isEmpty(props.agentsHighlighted) ||
      !props.highlightedAgents[nodeData.title]
        ? false
        : props.highlightedAgents[nodeData.title].includes(nodeData.title);
    const isVisible =
      isEmpty(agentsChecked) || !agentsChecked[nodeData.title]
        ? false
        : agentsChecked[nodeData.title].includes(nodeData.title);

    return (
      <Row className={['noChildrenRow', 'checkboxSet'].join(' ')}>
        <Col span={12}>
          <Checkbox
            className={'header-checkbox'}
            key={`${nodeData.title}-highlight`}
            checkboxType={CHECKBOX_TYPE_STAR}
            value={nodeData.title}
            checked={isHighlighted}
            onChange={(event) =>
              onAgentWithNoTagsChangeHighlight(event, nodeData.title)
            }
          />
        </Col>
        <Col span={12}>
          <Checkbox
            className={'header-checkbox'}
            key={`${nodeData.title}-onoff`}
            checked={isVisible}
            value={nodeData.title}
            onChange={(event) =>
              onAgentWithNoTagsChangeVisible(event, nodeData.title)
            }
          />
        </Col>
      </Row>
    );
  };

  const onSubHighlightChange = (key: string, values: string[]) => {
    // const { handleHighlight } = this.props;
    handleHighlight({ [key]: values });
  };

  const onAgentWithNoTagsChangeHighlight = (
    event: CheckboxChangeEvent,
    title: string
  ) => {
    if (event.target.checked) {
      onSubHighlightChange(title, [title]);
    } else {
      onSubHighlightChange(title, []);
    }
  };

  const onSubCheckboxChange = (key: string, values: string[]) => {
    // const { handleAgentCheck } = this.props;
    handleAgentCheck({ [key]: values });
  };

  const onAgentWithNoTagsChangeVisible = (
    event: CheckboxChangeEvent,
    title: string
  ) => {
    if (event.target.checked) {
      onSubCheckboxChange(title, [title]);
    } else {
      onSubCheckboxChange(title, []);
    }
  };

  return (
    <div className="checkbox-container">
      <Row className="colLabels">
        <Col span={CHECKBOX_SPAN_NO} offset={4}>
          <label className="starIcon" />S
        </Col>
        <Col span={CHECKBOX_SPAN_NO}>
          <label>s</label>
        </Col>
        <Col flex={LABEL_SPAN_NO} offset={1}>
          <label>t</label>
        </Col>
      </Row>
      <TreeNode headerContent={renderCheckAllButton()} />
      {props.treeData.map((nodeData) => {
        return (
          <TreeNode
            headerContent={
              <>
                {nodeData.children.length
                  ? renderSharedCheckboxes(nodeData)
                  : renderRowWithNoChildren(nodeData)}{' '}
                <ColorSwatch color={nodeData.color} />
                <Text
                  style={{ maxWidth: 143 }}
                  ellipsis={{
                    tooltip: nodeData.title,
                  }}
                >
                  <label className="headerLabel">{nodeData.title}</label>
                </Text>
              </>
            }
            expandByDefault={!nodeData.color}
            key={nodeData.key}
          >
            {nodeData.children.length > 0 && (
              <Row className="subMenu">
                <Col span={CHECKBOX_SPAN_NO} offset={3}>
                  <CheckboxTreeSubmenu
                    options={nodeData.children}
                    checkedAgents={
                      props.highlightedAgents[nodeData.title] || []
                    }
                    // checkboxType={CHECKBOX_TYPE_STAR}
                    onChange={(values) =>
                      onSubHighlightChange(nodeData.title, values as string[])
                    }
                  />
                </Col>
                <Col span={CHECKBOX_SPAN_NO}>
                  <CheckboxTreeSubmenu
                    options={nodeData.children}
                    checkedAgents={agentsChecked[nodeData.title] || []}
                    onChange={(values) =>
                      onSubCheckboxChange(nodeData.title, values as string[])
                    }
                  />
                </Col>
                <Col offset={4} className="checkboxLabels">
                  {nodeData.children.map((value) => {
                    return (
                      <div
                        key={`label-${nodeData.title}-${value.value}`}
                        className="rowLabelContainer"
                      >
                        <ColorSwatch color={value.color || nodeData.color} />
                        <label className="rowLabel" key={value.value as string}>
                          {value.label}
                        </label>
                      </div>
                    );
                  })}
                </Col>
              </Row>
            )}
          </TreeNode>
        );
      })}
    </div>
  );
};

export default CheckBoxTree;
