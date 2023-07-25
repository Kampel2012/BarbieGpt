import { useCallback } from 'react';

const useDebounce = (func, delay, options = '') => {
  function debounce(func, delay) {
    let timer;
    return function () {
      const context = this;
      const args = arguments;

      clearTimeout(timer);

      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(debounce(func, delay), [...options]);
};

export default useDebounce;
