import * as React from 'react';

import '../../css/viewerTitle.css';

interface ViewerTitleProps {
  title: string;
}

const ViewerTitle: React.FunctionComponent<ViewerTitleProps> = (
  props: ViewerTitleProps
): JSX.Element => {
  console.log('title log', props.title);
  return (
    <div className="title-container">
      <div className="title"> {props.title} </div>
    </div>
  );
};

export default ViewerTitle;
