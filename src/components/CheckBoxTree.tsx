import * as React from 'react';

import '../../css/checkBoxTree.css';
import { Col, Row, Typography } from 'antd';
import { map, filter, isEmpty } from 'lodash';
import SharedCheckbox from './SharedCheckBox';
import TreeNode from './TreeNode';
import ColorSwatch from './ColorSwatch';
import Checkbox from './CheckBox';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import CheckboxTreeSubmenu from './CheckBoxTreeSubmenu';
import { SelectionStateInfo } from '@aics/simularium-viewer';
import {
  AgentDisplayNode,
  CHECKBOX_TYPE_STAR,
  SelectionEntry,
  VisibilitySelectionMap,
} from '../types';

const { Text } = Typography;

interface CheckBoxTreeProps {
  //   uiData: UIDisplayData;
  treeData: AgentDisplayNode[];
  agentsHighlighted: SelectionEntry[];
  hiddenAgents: VisibilitySelectionMap;
  setHiddenAgents: (agents: VisibilitySelectionMap) => void;
  highlightedAgents: VisibilitySelectionMap;
  setHighlightedAgents: (agents: VisibilitySelectionMap) => void;
  agentsChecked: VisibilitySelectionMap;
  setAgentsChecked: (agents: VisibilitySelectionMap) => void;
  selectionStateInfo: SelectionStateInfo;
  setSelectionStateInfo: (info: SelectionStateInfo) => void;
}

const CHECKBOX_SPAN_NO = 2;
const LABEL_SPAN_NO = 6;

const CheckBoxTree: React.FunctionComponent<CheckBoxTreeProps> = (
  props: CheckBoxTreeProps
): JSX.Element => {
  const handleAgentCheck = props.setHiddenAgents;
  const handleHighlight = props.setHighlightedAgents;

  const agentsChecked = props.agentsChecked;

  const renderCheckAllButton = () => {
    const checkedList = filter(
      map(agentsChecked, (value, key): string => (value.length ? key : ''))
    );
    return (
      <div className="check-all-checkbox">
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

    const isVisible = Boolean(props.hiddenAgents[nodeData.title]);

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
            onChange={(event) => {
              onAgentWithNoTagsChangeVisible(event, nodeData.title);
            }}
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
    console.log('checked or not?', event.target.checked);
    if (event.target.checked) {
      onSubHighlightChange(title, [title]);
    } else {
      onSubHighlightChange(title, []);
    }
  };

  const onSubCheckboxChange = (key: string, values: string[]) => {
    // const { handleAgentCheck } = this.props;
    console.log('event key ', key, 'values', values);
    handleAgentCheck({ [key]: values });
  };

  const onAgentWithNoTagsChangeVisible = (
    event: CheckboxChangeEvent,
    title: string
  ) => {
    console.log(
      'onAgentWithNoTagsChangeVisible checked or not',
      event.target.checked
    );
    if (event.target.checked) {
      onSubCheckboxChange(title, [title]);
    } else {
      onSubCheckboxChange(title, []);
    }
  };

  return (
    <div className="checkbox-container">
      <Row className="col-labels">
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
