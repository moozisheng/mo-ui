import { useRef } from 'react';
import { useMount, useUnmount,useMemoizedFn,useCounter,  } from 'ahooks';
import type { ValueParam } from 'ahooks/lib/useCounter';
import { Options } from './index.d';

export function usePromisePercent(promise: Promise<any> | boolean, options?: Options) {

  const [current, payload] = useCounter(1, { min: 1, max: 100 });
  const { inc, set } = payload;
  const { limit = 80, step = 20 } = options ?? {};

  const percentRef = useRef(current);
  percentRef.current = current;

  const stepRef = useRef(step);
  stepRef.current = step;

  const promiseRef = useRef(promise);
  promiseRef.current = promise;

  const runDispose = useRef<() => void>();

  const run = useMemoizedFn(() => {
    const loop = async () => {
      const percent = percentRef.current;
      if (percent < limit) {
        const speed = Math.max(stepRef.current * ((limit - percent) / limit), 0.01);
        inc(Math.random() * speed);
        const timer = setTimeout(loop, 100);
        runDispose.current = () => {
          clearTimeout(timer);
        };
      }
    };

    loop();

    if (promiseRef.current instanceof Promise) {
      promiseRef.current.then(() => set(100)).catch(() => {});
    }
  });

  if (typeof promiseRef.current === 'boolean') {
    if (promiseRef.current && current !== 100) {
      set(100);
    }
  }

  const reset = useMemoizedFn(() => {
    runDispose.current?.();
    percentRef.current = 1;
    payload.reset();
    run();
  });

  useUnmount(() => {
    runDispose.current?.();
  });

  useMount(run);

  return [current, { ...payload, reset }] as [
    number,
    {
      inc: (delta?: number) => void;
      dec: (delta?: number) => void;
      set: (value: ValueParam) => void;
      reset: () => void;
    },
  ];
}
