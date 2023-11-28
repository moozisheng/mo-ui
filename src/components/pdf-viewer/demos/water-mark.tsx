// @ts-ignore
import { PDFViewer } from 'MO-UI';
import React from 'react';

const App: React.FC = () => {
  return (
    <PDFViewer
      src="https://mo-ui.oss-cn-shenzhen.aliyuncs.com/pdf-open-parameters.pdf"
      height={400}
      waterMark="MO-UI"
      waterMarkProps={{ style: { color: 'rgba(0, 0, 0, 0.1)' } }}
    />
  );
};

export default App;
