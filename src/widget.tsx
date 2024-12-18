// Copyright (c) Megan Riel-Mehan
// Distributed under the terms of the Modified BSD License.
import {
  loadSimulariumFile,
  SimulariumController,
} from '@aics/simularium-viewer';
import { createRender, useModelState } from '@anywidget/react';
import React from 'react';

import Viewer from './Viewer';
import { VisibilityProvider } from './AgentVisibilityContext';
import StyleProvider from './ConfigProvider';

// Import the CSS
import '../css/widget.css';

const render = createRender(() => {
  const [trajectoryAsString] = useModelState<string>('trajectory_str');
  const controller = new SimulariumController({});
  React.useEffect(() => {
    if (!trajectoryAsString) {
      return;
    }
    const blob = new Blob([trajectoryAsString], { type: 'application/json' });
    const fetchData = async () => {
      const simulariumFile = await loadSimulariumFile(blob);
      await controller.changeFile({ simulariumFile }, 'test.siumularium');
    };
    fetchData()
      .then(() => {
        console.log('fetched data');
      })
      .catch(console.error);
  }, []);
  return (
    <div className="nbsv">
      <div>
        <StyleProvider>
          <VisibilityProvider>
            <Viewer controller={controller} />
          </VisibilityProvider>
        </StyleProvider>
      </div>
    </div>
  );
});

export default { render };
