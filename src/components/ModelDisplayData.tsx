import * as React from 'react';

import { Info } from './Icons';

import '../../css/model_display_data.css';

interface ModelDisplayDataProps {
  trajectoryTitle?: string;
  title?: string;
  hasMetaData: boolean;
  // publicationData: PublicationData | null;
  showPanel: (value: boolean) => void;
}

const ViewerTitle: React.FunctionComponent<ModelDisplayDataProps> = (
  props: ModelDisplayDataProps
): JSX.Element => {
  // const { title, trajectoryTitle } = props;

  const {
    // description,
    // authors,
    // publicationData,
    // version,
    // sourceCodeUrl,
    // inputDataUrl,
    // sourceCodeLicenseUrl,
    // rawOutputDataUrl,
    title,
    trajectoryTitle,
    hasMetaData,
    showPanel,
  } = props;
  // const hasLinks = inputDataUrl || sourceCodeLicenseUrl || rawOutputDataUrl;

  const [showMetaData, setShowMetaData] = React.useState<boolean>(false);
  // const [hoverOnClose, setHoverOnClose] = React.useState<boolean>(false);

  // const hasMetaData = (): boolean => {
  //   for (const key in props) {
  //     if (key !== 'trajectoryTitle') {
  //       if (props[key as keyof ModelDisplayDataProps] !== undefined) {
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // };

  const handleInfoButtonClick = () => {
    setShowMetaData(!showMetaData);
    showPanel(true);
  };

  // const MetaDataPanel = (
  //   <div className="meta-data-panel">
  //     <div className="meta-data-header">
  //       <h3 className="header-title"> About this Simulation </h3>
  //       <button
  //         className="close-button"
  //         onClick={handleInfoButtonClick}
  //         onMouseEnter={() => setHoverOnClose(true)}
  //         onMouseLeave={() => setHoverOnClose(false)}
  //       >
  //         {hoverOnClose ? CloseHover : Close}
  //       </button>
  //     </div>
  //     <div className="meta-data-body">
  //       {version && <div className="version">v{version}</div>}
  //       <p className="description">{description}</p>
  //       <div className="authors-journal">
  //         <div className="authors">{authors}</div>
  //         {publicationData && (
  //           <a
  //             href={publicationData.url}
  //             className="publication-link"
  //             target="_blank"
  //             rel="noopener noreferrer"
  //           >
  //             {publicationData.title}. <i>{publicationData.journal}</i> (
  //             <i>{publicationData.year}</i>)
  //           </a>
  //         )}
  //       </div>

  //       {hasLinks && (
  //         <div className="meta-data-links">
  //           {sourceCodeUrl && (
  //             <div>
  //               <div> Link to software used to generate data </div>
  //               <a href={sourceCodeUrl} className="italic-link">
  //                 {sourceCodeUrl}
  //               </a>
  //             </div>
  //           )}
  //           {sourceCodeLicenseUrl && (
  //             <div>
  //               <div>Link to third party licensing requirements</div>
  //               <div>
  //                 <a href={sourceCodeLicenseUrl} className="italic-link">
  //                   {sourceCodeLicenseUrl}
  //                 </a>
  //               </div>
  //             </div>
  //           )}
  //           {rawOutputDataUrl && (
  //             <div>
  //               <div>Link to visualized output</div>
  //               <div>
  //                 <a href={rawOutputDataUrl} className="italic-link">
  //                   {rawOutputDataUrl}
  //                 </a>
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );

  return (
    <div className="title-container">
      <div className="title">
        {trajectoryTitle || title || '<Untitled trajectory>'}
        {hasMetaData ? (
          <div className="info-button" onMouseDown={handleInfoButtonClick}>
            {Info}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ViewerTitle;
