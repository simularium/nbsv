import * as React from 'react';

import '../../css/side_panel.css';

// TODO placeholder, side panel will receive many props when rendering checkboxes
interface SidePanelProps {}

const SidePanel: React.FunctionComponent<SidePanelProps> = (
  props: SidePanelProps
): JSX.Element => {
  return (
    <div className="sp-container">
      <div className="agent-title">Agents</div>
    </div>
  );
};

export default SidePanel;