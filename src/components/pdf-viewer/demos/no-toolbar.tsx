// @ts-ignore
import { PDFViewer } from 'MO-UI';
import React from 'react';

const App: React.FC = () => {
  return (
    <PDFViewer
      src="https://mo-ui.oss-cn-shenzhen.aliyuncs.com/pdf-open-parameters.pdf"
      // src="https://react-pdf-viewer.dev/assets/pdf-open-parameters.pdf"
      height={400}
      layoutVisible={false}
    />
  );
};

export default App;
