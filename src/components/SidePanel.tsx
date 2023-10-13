import * as React from 'react';

import '../../css/sidePanel.css';

interface SidePanelProps {
  title: string;
}

const SidePanel: React.FunctionComponent<SidePanelProps> = (
  props: SidePanelProps
): JSX.Element => {
  console.log('sidepanel log', props.title);
  return (
    <div className="sp-container">
      <div className="title"> some words </div>
    </div>
  );
};

export default SidePanel;
