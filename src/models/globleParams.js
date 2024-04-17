import { useState, useCallback } from 'react';

export default function GlobleParams() {
  const [globleParams, setParams] = useState({});

  //   设置全局参数
  const setGlobleParams = useCallback((obj) => setParams((state) => ({ ...state, ...obj })), []);

  //   清除某个全局参数
  const removeGlobleParams = useCallback(
    (str) =>
      setParams((state) => {
        delete state[str];
        return state;
      }),
    [],
  );

  //   清空全局参数
  const clearGlobleParams = useCallback(() => setParams((state) => ({})), []);

  return { globleParams, setGlobleParams, removeGlobleParams, clearGlobleParams };
}
