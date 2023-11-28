import { RotatePageEvent } from '@react-pdf-viewer/core';
// @ts-ignore
import { PDFViewer } from 'MO-UI';
import React from 'react';

const App: React.FC = () => {
  const handleRotatePage = (e: RotatePageEvent) => {
    console.log(`rotate page: ${e.direction}, ${e.pageIndex}`);
  };

  return (
    <PDFViewer
      src="https://mo-ui.oss-cn-shenzhen.aliyuncs.com/pdf-open-parameters.pdf"
      height={400}
      rotateButtonVisible={true}
      onRotatePage={handleRotatePage}
    />
  );
};

export default App;
