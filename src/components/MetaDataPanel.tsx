import * as React from 'react';

import { Close, CloseHover } from './Icons';

import '../../css/meta_data_panel.css';
import { ModelInfo } from '@aics/simularium-viewer/type-declarations/simularium/types';
import { PublicationData } from '../Viewer';

interface MetaDataPanelProps extends ModelInfo {
  publicationData: PublicationData | null;
  showPanel: (value: boolean) => void;
}

const MetaDataPanel: React.FunctionComponent<MetaDataPanelProps> = (
  props: MetaDataPanelProps
): JSX.Element => {
  const {
    description,
    authors,
    publicationData,
    version,
    sourceCodeUrl,
    inputDataUrl,
    sourceCodeLicenseUrl,
    rawOutputDataUrl,
    showPanel,
  } = props;
  const hasLinks = inputDataUrl || sourceCodeLicenseUrl || rawOutputDataUrl;

  //   const [showMetaData, setShowMetaData] = React.useState<boolean>(false);
  const [hoverOnClose, setHoverOnClose] = React.useState<boolean>(false);

  const handleInfoButtonClick = () => {
    showPanel(false);
  };

  return (
    <div className="meta-data-panel">
      <div className="meta-data-header">
        <h3 className="header-title"> About this Simulation </h3>
        <button
          className="close-button"
          onClick={handleInfoButtonClick}
          onMouseEnter={() => setHoverOnClose(true)}
          onMouseLeave={() => setHoverOnClose(false)}
        >
          {hoverOnClose ? CloseHover : Close}
        </button>
      </div>
      <div className="meta-data-body">
        {version && <div className="version">v{version}</div>}
        <p className="description">{description}</p>
        <div className="authors-journal">
          <div className="authors">{authors}</div>
          {publicationData && (
            <a
              href={publicationData.url}
              className="publication-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {publicationData.title}. <i>{publicationData.journal}</i> (
              <i>{publicationData.year}</i>)
            </a>
          )}
        </div>

        {hasLinks && (
          <div className="meta-data-links">
            {sourceCodeUrl && (
              <div>
                <div> Link to software used to generate data </div>
                <a href={sourceCodeUrl} className="italic-link">
                  {sourceCodeUrl}
                </a>
              </div>
            )}
            {sourceCodeLicenseUrl && (
              <div>
                <div>Link to third party licensing requirements</div>
                <div>
                  <a href={sourceCodeLicenseUrl} className="italic-link">
                    {sourceCodeLicenseUrl}
                  </a>
                </div>
              </div>
            )}
            {rawOutputDataUrl && (
              <div>
                <div>Link to visualized output</div>
                <div>
                  <a href={rawOutputDataUrl} className="italic-link">
                    {rawOutputDataUrl}
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetaDataPanel;
