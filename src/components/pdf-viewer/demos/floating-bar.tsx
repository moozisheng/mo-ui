// @ts-ignore
import { PDFViewer } from 'MO-UI';

import React from 'react';

const App: React.FC = () => {
  return (
    <PDFViewer
      src="https://mo-ui.oss-cn-shenzhen.aliyuncs.com/pdf-open-parameters.pdf"
      height={400}
      layoutVisible={false}
      toolbarMode="float"
    />
  );
};

export default App;
