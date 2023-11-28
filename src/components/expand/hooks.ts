import { useState } from 'react';
import { useRequest } from 'ahooks';
import { Options, Service } from 'ahooks/lib/useRequest/src/types';

export interface IRunParam {
  expanded?: boolean;
}

type Params = [IRunParam];

export interface IExtraOptions {
  defaultExpanded?: boolean;
  initialData?: any;
}

export function useMoreData<R = any, U = any, UU extends U = any>(
  service: Service<R, Params>,
  options: Options<R, Params> & IExtraOptions,
) {
  const { defaultExpanded = false, initialData, ...restOptions } = options;
  const [expanded, setExpanded] = useState(defaultExpanded);
  const {
    runAsync,
    mutate,
    data = initialData,
    loading,
  } = useRequest(service, {
    manual: true,
    defaultParams: [{ expanded: defaultExpanded }],
    ...restOptions,
  });

  const expandedChangeHandle = (willExpand: boolean) => {
    if (willExpand) {
      // expand by using remote data
      runAsync({ expanded: willExpand }).then(() => {
        setExpanded(true);
      });
    } else {
      // collapse by using initial data
      mutate(initialData);
      setExpanded(false);
    }
  };

  const containerProps = {
    loading,
    expanded,
    onExpandedChange: expandedChangeHandle,
  };

  return {
    data,
    loading,
    containerProps,
  };
}
