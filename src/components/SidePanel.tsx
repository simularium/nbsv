import * as React from 'react';

import '../../css/side_panel.css';

import { Card } from 'antd';

// TODO placeholder, side panel will receive many props when rendering checkboxes
interface SidePanelProps {}

const SidePanel: React.FunctionComponent<SidePanelProps> = (
  props: SidePanelProps
): JSX.Element => {
  return (
    <div className="sp-container">
      <Card className="title-card" bordered={false}>
        Agents
      </Card>
    </div>
  );
};

export default SidePanel;
