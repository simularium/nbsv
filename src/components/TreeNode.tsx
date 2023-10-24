import React, { ReactNode, useState } from 'react';
import { Button } from 'antd';
import { noop } from 'lodash';
import classNames from 'classnames';

// import { CaretRight } from '../Icons';

import collapseAnimation from './collapseMotion';

import '../../css/treeNode.css';

interface TreeNodeProps extends React.PropsWithChildren<any> {
  actions?: ReactNode[];
  headerContent: ReactNode;
  expandByDefault?: boolean;
}

const TreeNode = ({
  children,
  actions = [],
  headerContent,
  expandByDefault,
}: TreeNodeProps): JSX.Element => {
  const [isExpanded, setExpanded] = useState<boolean>(!!expandByDefault);
  const ref = React.createRef<HTMLDivElement>();
  const onToggle = () => {
    const isOpening = !isExpanded;
    setExpanded(!isExpanded);
    if (isOpening && ref.current) {
      collapseAnimation.enter(ref.current, noop);
    } else if (ref.current) {
      collapseAnimation.leave(ref.current, noop);
    }
  };
  const buttonClassNames = classNames('toggleButton', {
    ['active']: isExpanded,
  });
  const panelClassNames = classNames('panel', {
    ['active']: isExpanded,
  });
  return (
    <div className="treenode-container">
      <header className="header">
        {actions.length > 0 && actions.map((button) => button)}
        {children && (
          <Button
            className={buttonClassNames}
            shape="circle"
            // icon={CaretRight}
            onClick={onToggle}
          />
        )}
        {headerContent}
      </header>
      <div ref={ref} className={panelClassNames}>
        {children}
      </div>
    </div>
  );
};

export default TreeNode;
