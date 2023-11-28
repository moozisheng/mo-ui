// @ts-ignore
import { PDFViewer } from 'MO-UI';
import React from 'react';

const App: React.FC = () => {
  return (
    <PDFViewer
      src="https://mo-ui.oss-cn-shenzhen.aliyuncs.com/pdf-open-parameters.pdf"
      height={400}
      drawMessageOnTopOfPage="我是在页面顶部绘制的信息"
    />
  );
};

export default App;
