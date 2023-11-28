import { useCreation } from 'ahooks';
import classNames from 'classnames';
import DOMPurify from 'dompurify';
import React, { HTMLProps } from 'react';
import { CommonType } from '../../types/common';

export type SafeHtmlProps = HTMLProps<any> &
  CommonType & {
    /**
     * @description HTML 内容
     */
    html: string;

    /**
     * @description dompurify 配置
     */
    domPurifyOptions?: Record<string, any>;
  };

const cleanHtml = (html: string, options: Record<string, any> = {}) => {
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ['target'],
    ...options,
  });
};

const SafeHtml = (props: SafeHtmlProps) => {
  const { className, style, html, domPurifyOptions, ...rest } = props;

  const cleanedHtml = useCreation(
    () => cleanHtml(html, domPurifyOptions),
    [html, domPurifyOptions],
  );

  return (
    <span
      className={classNames('safe-html', className)}
      style={style}
      {...rest}
      dangerouslySetInnerHTML={{
        __html: cleanedHtml,
      }}
    />
  );
};

SafeHtml.cleanHtml = cleanHtml;

export default SafeHtml;
