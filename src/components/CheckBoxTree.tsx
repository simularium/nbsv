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
import {
  AgentDisplayNode,
  CHECKBOX_TYPE_STAR,
  VisibilitySelectionMap,
} from '../types';
import {
  getSelectAllVisibilityMap,
  getSelectNoneVisibilityMap,
} from '../selectors';

const { Text } = Typography;

interface CheckBoxTreeProps {
  //   uiData: UIDisplayData;
  treeData: AgentDisplayNode[];
  hiddenAgents: VisibilitySelectionMap;
  setHiddenAgents: (agents: VisibilitySelectionMap) => void;
  highlightedAgents: VisibilitySelectionMap;
  setHighlightedAgents: (agents: VisibilitySelectionMap) => void;
  agentsChecked: VisibilitySelectionMap;
  setAgentsChecked: (agents: VisibilitySelectionMap) => void;
  toggleAllAgents: (agents: VisibilitySelectionMap) => void;
}

const CHECKBOX_SPAN_NO = 2;
// const LABEL_SPAN_NO = 6;

const CheckBoxTree: React.FunctionComponent<CheckBoxTreeProps> = (
  props: CheckBoxTreeProps
): JSX.Element => {
  const handleAgentCheck = props.setHiddenAgents;
  const handleHighlight = props.setHighlightedAgents;

  const agentsChecked = props.agentsChecked;

  const payloadForSelectNone = getSelectNoneVisibilityMap(props.treeData);
  const payloadForSelectAll = getSelectAllVisibilityMap(props.treeData);

  const toggleAllOnOff = (agents: { [key: string]: string[] }) => {
    const toggleOn = Object.values(agents).some((value) => value.length > 0);
    if (toggleOn) {
      console.log('select all');
      props.toggleAllAgents(payloadForSelectAll);
    } else {
      console.log('select none');
      props.toggleAllAgents(payloadForSelectNone);
    }
  };

  const renderCheckAllButton = () => {
    // const checkedList = filter(
    //   map(agentsChecked, (value, key): string => (value.length ? key : ''))
    // );
    const hiddenList = filter(
      map(props.hiddenAgents, (value, key): string => (value.length ? key : ''))
    );

    console.log('hidden list', hiddenList);

    return (
      <div className="check-all-checkbox">
        <SharedCheckbox
          title="All"
          showLabel={true}
          options={map(props.treeData, 'key' as string)}
          //   onTopLevelCheck={this.toggleAllOnOff}
          onTopLevelCheck={toggleAllOnOff}
          //   indeterminate={isSharedCheckboxIndeterminate}
          indeterminate={getIsSharedCheckboxIndeterminate(
            props.treeData,
            props.hiddenAgents
          )}
          checkedList={hiddenList}
          // hiddenList={hiddenList}
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
        // This should theoretically never happen: well it happens now :)
        // console.warn(
        //   `Skipping agent ${agent.key} in getIsSharedCheckboxIndeterminate because it doesn't exist in agentVisibilityMap`
        // );
        continue;
      }

      if (visibleStates.length) {
        let i = 0;
        while (i < visibleStates.length) {
          numInvisibleAgents++;
          i++;
        }
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

  const renderSharedCheckboxes = (nodeData: AgentDisplayNode) => {
    // TODO these should correspond to particular parts of the data tree, this is placeholder work
    const hiddenList = filter(
      map(props.hiddenAgents, (value, key): string => (value.length ? key : ''))
    );
    const highlightedList = filter(
      map(props.highlightedAgents, (value, key): string =>
        value.length ? key : ''
      )
    );

    return (
      <Row key="actions" className="checkboxSet">
        <Col span={12}>
          <SharedCheckbox
            title={nodeData.title}
            showLabel={false}
            checkboxType={CHECKBOX_TYPE_STAR}
            options={map(nodeData.children, 'value' as string)}
            onTopLevelCheck={onTopLevelHighlightChange}
            // checkedList={props.highlightedAgents[nodeData.title] || []}
            isHeader={true}
            //TODO: this is a place holder for now
            checkedList={highlightedList}
          />
        </Col>
        <Col span={12}>
          <SharedCheckbox
            title={nodeData.title}
            showLabel={false}
            options={map(nodeData.children, 'value' as string)}
            onTopLevelCheck={onTopLevelCheck}
            // checkedList={props.agentsChecked[nodeData.title] || []}
            isHeader={true}
            //TODO: this is a place holder for now
            checkedList={hiddenList}
          />
        </Col>
      </Row>
    );
  };

  const renderRowWithNoChildren = (nodeData: AgentDisplayNode) => {
    const isHighlighted = Boolean(props.highlightedAgents[nodeData.title]);
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
            checked={!isVisible}
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
    if (!event.target.checked) {
      onSubCheckboxChange(title, [title]);
    } else {
      onSubCheckboxChange(title, []);
    }
  };

  return (
    <div className="checkbox-container">
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
