import { RenderPageProps } from '@react-pdf-viewer/core';
import React, { ReactNode } from 'react';

const PageContainer = (props: RenderPageProps & { children: ReactNode }) => (
  <div>
    {props.canvasLayer.children}
    {props.children}
    {props.annotationLayer.children}
    {props.textLayer.children}
  </div>
);

export default PageContainer;
