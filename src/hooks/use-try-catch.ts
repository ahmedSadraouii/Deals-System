import { useCallback } from 'react';

/**
 * Custom React hook that wraps a function with error handling for both synchronous and asynchronous operations.
 * It supports catching errors and optionally handling them with a provided errorHandler function. Uses `useCallback`
 * to memoize the wrapped function, only re-creating it if the original function or errorHandler changes.
 */
export default function useTryCatch<T extends any[], R>(
  handle: (...args: T) => R | Promise<R>,
  handleError?: (error: any) => void,
): (...args: T) => Promise<R | void> | void {
  return useCallback(
    (...args: T): Promise<R | void> | void => {
      let isPrms = false;
      try {
        const ret = handle(...args);
        if (isPromise<R>(ret)) {
          isPrms = true;
          return ret.catch((error: any) => {
            console.error(error);
            handleError?.(error);
            return undefined;
          });
        } else {
          return Promise.resolve(ret);
        }
      } catch (error) {
        console.error(error);
        if (isPrms) {
          return Promise.reject(error);
        } else {
          handleError?.(error);
        }
      }
    },
    [handle, handleError],
  );
}

// Type guard to check if a value is a Promise
function isPromise<R>(value: R | Promise<R>): value is Promise<R> {
  return !!value && typeof (value as any).then === 'function';
}
